// Navbar.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { Navbar } from "../Navbar"; // ajuste le chemin selon ton projet
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage, LanguageProvider } from "@/contexts/LanguageContext";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/contexts/LanguageContext", () => ({
  useLanguage: jest.fn(),
  LanguageProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock("@/contexts/AuthContext", () => ({
  useAuth: jest.fn(),
}));

describe("Navbar dropdown menu", () => {
  const mockPush = jest.fn();
  const mockLogout = jest.fn();
  const mockOnMenuClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useAuth as jest.Mock).mockReturnValue({
      user: { nom: "Test", email: "test@test.com" },
      logout: mockLogout,
    });
    (useLanguage as jest.Mock).mockReturnValue({
      language: "fr",
      setLanguage: jest.fn(),
    });
  });

  test("dropdown menu fonctionne", async () => {
    render(
      <LanguageProvider>
        <Navbar onMenuClick={mockOnMenuClick} />
      </LanguageProvider>
    );

    // Vérifie que le bouton menu appelle la fonction onMenuClick
    const menuButton = screen.getByLabelText("Menu");
    fireEvent.click(menuButton);
    expect(mockOnMenuClick).toHaveBeenCalledTimes(1);

    // ouvre le menu avatar
    const avatarButton = screen.getByLabelText("Profil");
    fireEvent.click(avatarButton);

    // clique sur Profil
    const profilItem = await screen.findByText("Profil");
    fireEvent.click(profilItem);
    expect(mockPush).toHaveBeenCalledWith("/profil");

    // ouvre à nouveau le menu avatar
    fireEvent.click(avatarButton);

    // clique sur Paramètres
    const settingsItem = await screen.findByText("Paramètres");
    fireEvent.click(settingsItem);
    expect(mockPush).toHaveBeenCalledWith("/parametres");

    // ouvre à nouveau le menu avatar
    fireEvent.click(avatarButton);

    // clique sur Déconnexion
    const logoutItem = await screen.findByText("Déconnexion");
    fireEvent.click(logoutItem);
    expect(mockLogout).toHaveBeenCalled();
  });
});
