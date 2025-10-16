import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AuthService } from "../services/auth.service";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import FormLogin from "./FormLogin";

// 🧱 On "mock" les dépendances externes
jest.mock("../services/auth.service");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
jest.mock("@/contexts/AuthContext", () => ({
  useAuth: jest.fn(),
}));

describe("FormLogin Component", () => {
  const mockPush = jest.fn();
  const mockSetUser = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useAuth as jest.Mock).mockReturnValue({ setUser: mockSetUser });
  });

  it("affiche le formulaire avec les champs email et mot de passe", () => {
    render(<FormLogin />);
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Mot de passe")).toBeInTheDocument();
  });

  it("effectue une connexion réussie et redirige vers le dashboard admin", async () => {
    (AuthService.login as jest.Mock).mockResolvedValueOnce({
      success: true,
      data: {
        token: "fake-token",
        userInfo: {
          id: 1,
          nom: "Admin",
          email: "admin@mail.com",
          role: "admin",
          type: "admin",
        },
      },
    });

    render(<FormLogin />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "admin@mail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Mot de passe"), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByRole("button", { name: /connexion/i }));

    await waitFor(() => {
      expect(AuthService.login).toHaveBeenCalledWith({
        email: "admin@mail.com",
        password: "password",
      });
      expect(mockSetUser).toHaveBeenCalled();
      expect(mockPush).toHaveBeenCalledWith("/management/dashboardAdmin");
    });
  });

  it("affiche une erreur si la connexion échoue", async () => {
    (AuthService.login as jest.Mock).mockRejectedValueOnce(new Error("Erreur réseau"));

    render(<FormLogin />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "admin@mail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Mot de passe"), {
      target: { value: "wrongpass" },
    });
    fireEvent.click(screen.getByRole("button", { name: /connexion/i }));

    await waitFor(() => {
      expect(AuthService.login).toHaveBeenCalled();
    });
  });
});
