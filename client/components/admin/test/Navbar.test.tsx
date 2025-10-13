// Navbar.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { Navbar } from "../Navbar";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/contexts/LanguageContext";
import "@testing-library/jest-dom";

// Mock du router de Next.js
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("Navbar", () => {
  const onMenuClick = jest.fn();

  const renderNavbar = () => {
    render(
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <Navbar onMenuClick={onMenuClick} />
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    );
  };

  it("affiche le nom de l'utilisateur si connecté", () => {
    // Simuler un utilisateur connecté
    const TestComponent = () => {
      const { setUser } = useAuth();
      setUser({ id: 1, nom: "Prisca", email: "p@example.com", role: "admin", type: "employe" });
      return <Navbar onMenuClick={onMenuClick} />;
    };

    render(
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <TestComponent />
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    );

    expect(screen.getByText("Prisca")).toBeInTheDocument();
  });

  it("appel le logout quand on clique sur Déconnexion", () => {
    // Simuler un utilisateur connecté
    const TestComponent = () => {
      const { setUser } = useAuth();
      setUser({ id: 1, nom: "Prisca", email: "p@example.com", role: "admin", type: "employe" });
      return <Navbar onMenuClick={onMenuClick} />;
    };

    render(
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <TestComponent />
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    );

    const logoutButton = screen.getByText("Déconnexion");
    fireEvent.click(logoutButton);

    expect(screen.queryByText("Prisca")).not.toBeInTheDocument();
  });

  it("ouvre le menu hamburger sur mobile", () => {
    renderNavbar();
    const menuButton = screen.getByRole("button", { name: /bars/i });
    fireEvent.click(menuButton);
    expect(onMenuClick).toHaveBeenCalled();
  });
});
