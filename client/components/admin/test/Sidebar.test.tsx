import { render, screen, fireEvent } from "@testing-library/react";
import { Sidebar } from "../Sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePathname, useRouter } from "next/navigation";

// 🧱 Mocks des hooks Next.js et contextes
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
  useRouter: jest.fn(),
}));

jest.mock("@/contexts/AuthContext", () => ({
  useAuth: jest.fn(),
}));

jest.mock("@/contexts/LanguageContext", () => ({
  useLanguage: jest.fn(),
}));

describe("Sidebar", () => {
  const mockPush = jest.fn();
  const mockLogout = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useAuth as jest.Mock).mockReturnValue({
      user: { id: 1, nom: "Admin", type: "admin", role: "admin", email: "admin@mail.com" },
      logout: mockLogout,
    });
    (useLanguage as jest.Mock).mockReturnValue({ t: (key: string) => key });
    (usePathname as jest.Mock).mockReturnValue("/management/dashboard");
  });

  it("affiche les éléments du menu pour un admin", () => {
    render(<Sidebar isOpen={true} onClose={jest.fn()} />);
    
    // Vérifie que le dashboard existe
    expect(screen.getByText("dashboard")).toBeInTheDocument();
    expect(screen.getByText("clients")).toBeInTheDocument();
    expect(screen.getByText("transport")).toBeInTheDocument();
    expect(screen.getByText("transactions")).toBeInTheDocument();
    expect(screen.getByText("documents")).toBeInTheDocument();
    expect(screen.getByText("tracking")).toBeInTheDocument();

    // Vérifie que le menu superadmin/employés n'existe pas pour admin
    expect(screen.queryByText("employes")).toBeNull();
  });

  it("permet de fermer un menu et de cliquer sur logout", () => {
    const onCloseMock = jest.fn();
    render(<Sidebar isOpen={true} onClose={onCloseMock} />);

    // Clique sur logout
    const logoutButton = screen.getByText("logout");
    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith("/auth");
    expect(onCloseMock).toHaveBeenCalled();
  });

  it("affiche un loader si user est null", () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null });
    render(<Sidebar isOpen={true} onClose={jest.fn()} />);
    expect(screen.getByText("Chargement...")).toBeInTheDocument();
  });

  it("ne rend rien si user est undefined", () => {
    (useAuth as jest.Mock).mockReturnValue({ user: undefined });
    const { container } = render(<Sidebar isOpen={true} onClose={jest.fn()} />);
    expect(container).toBeEmptyDOMElement();
  });
});
