import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Sidebar } from "@/components/admin/Sidebar";

jest.mock("@/contexts/LanguageContext", () => ({
  useLanguage: () => ({ t: (key: string) => key }),
}));

jest.mock("@/contexts/AuthContext", () => ({
  useAuth: () => ({ logout: jest.fn() }),
}));

jest.mock("next/navigation", () => ({
  usePathname: () => "/management/dashboard",
  useRouter: () => ({ push: jest.fn() }),
}));

describe("Sidebar", () => {
  const onCloseMock = jest.fn();

  beforeEach(() => onCloseMock.mockClear());

  it("affiche le menu principal", () => {
    render(<Sidebar isOpen={true} onClose={onCloseMock} />);
    expect(screen.getByText("dashboard")).toBeInTheDocument();
    expect(screen.getByText("employes")).toBeInTheDocument();
    expect(screen.getByText("clients")).toBeInTheDocument();
    expect(screen.getByText("tracking")).toBeInTheDocument();
  });

  it("appel onClose quand on clique sur le fond", () => {
    render(<Sidebar isOpen={true} onClose={onCloseMock} />);
    fireEvent.click(screen.getByTestId("overlay"));
    expect(onCloseMock).toHaveBeenCalled();
  });

  it("déroule et replie le sous-menu transport", () => {
    render(<Sidebar isOpen={true} onClose={onCloseMock} />);
    const transportButton = screen.getByText("transport");

    // Le sous-menu est ouvert par défaut
    expect(screen.getByText("aerial")).toBeInTheDocument();
    expect(screen.getByText("maritime")).toBeInTheDocument();

    fireEvent.click(transportButton);
    expect(screen.queryByText("aerial")).not.toBeInTheDocument();
    expect(screen.queryByText("maritime")).not.toBeInTheDocument();
  });
});
