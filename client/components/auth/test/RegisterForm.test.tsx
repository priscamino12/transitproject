// RegisterForm.test.tsx
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import RegisterForm from "../components/Register";
import * as registerService from "../services/register.service";

jest.mock("../services/register.service", () => ({
  getTypesAcces: jest.fn().mockResolvedValue([{ id: 1, nom: "Premium", prixBase: 10000 }]),
  getModesPaiement: jest.fn().mockResolvedValue([{ id: 1, nom: "Carte bancaire" }]),
  createEntreprise: jest.fn().mockResolvedValue({ idEntreprise: 1 }),
  createAbonnement: jest.fn().mockResolvedValue({ idAbonnement: 1 }),
  createPaiement: jest.fn().mockResolvedValue({}),
  createEmploye: jest.fn().mockResolvedValue({}),
}));

describe("RegisterForm", () => {
  const onSwitch = jest.fn();

  beforeEach(async () => {
    await act(async () => {
      render(<RegisterForm onSwitch={onSwitch} />);
    });
  });

  test("rend la première étape et charge les options", async () => {
    expect(screen.getByText("Inscription Entreprise")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByLabelText("Nom de l'entreprise")).toBeInTheDocument();
      expect(screen.getByLabelText("Type d'accès")).toHaveTextContent("Sélectionner un type");
    });
  });

  test("affiche une erreur si champs obligatoires sont vides", async () => {
    fireEvent.click(screen.getByText("Suivant"));
    await waitFor(() => {
      expect(screen.getByText(/Veuillez remplir tous les champs requis/i)).toBeInTheDocument();
    });
  });

  test("navigue entre les étapes correctement", async () => {
    fireEvent.change(screen.getByLabelText("Nom de l'entreprise"), { target: { value: "Test Entreprise" } });
    fireEvent.change(screen.getByLabelText("NIF"), { target: { value: "123456" } });
    fireEvent.change(screen.getByLabelText("Type d'accès"), { target: { value: "1" } });
    fireEvent.click(screen.getByText("Suivant"));

    await waitFor(() => {
      expect(screen.getByLabelText("Date début")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText("Date début"), { target: { value: "2025-10-15" } });
    fireEvent.change(screen.getByLabelText("Date fin"), { target: { value: "2025-11-15" } });
    fireEvent.change(screen.getByLabelText("Montant"), { target: { value: "10000" } });
    fireEvent.change(screen.getByLabelText("Mode de paiement"), { target: { value: "1" } });
    fireEvent.click(screen.getByText("Suivant"));

    await waitFor(() => {
      expect(screen.getByLabelText("Nom administrateur")).toBeInTheDocument();
    });
  });

  test("soumet correctement le formulaire", async () => {
    // Étape 1
    fireEvent.change(screen.getByLabelText("Nom de l'entreprise"), { target: { value: "Test Entreprise" } });
    fireEvent.change(screen.getByLabelText("NIF"), { target: { value: "123456" } });
    fireEvent.change(screen.getByLabelText("Type d'accès"), { target: { value: "1" } });
    fireEvent.click(screen.getByText("Suivant"));

    // Étape 2
    await waitFor(() => screen.getByLabelText("Date début"));
    fireEvent.change(screen.getByLabelText("Date début"), { target: { value: "2025-10-15" } });
    fireEvent.change(screen.getByLabelText("Date fin"), { target: { value: "2025-11-15" } });
    fireEvent.change(screen.getByLabelText("Montant"), { target: { value: "10000" } });
    fireEvent.change(screen.getByLabelText("Mode de paiement"), { target: { value: "1" } });
    fireEvent.click(screen.getByText("Suivant"));

    // Étape 3
    await waitFor(() => screen.getByLabelText("Nom administrateur"));
    fireEvent.change(screen.getByLabelText("Nom administrateur"), { target: { value: "Admin Test" } });
    fireEvent.change(screen.getByLabelText("Email administrateur"), { target: { value: "admin@test.com" } });
    fireEvent.change(screen.getByLabelText("Mot de passe"), { target: { value: "123456" } });
    fireEvent.change(screen.getByLabelText("Confirmer mot de passe"), { target: { value: "123456" } });

    fireEvent.click(screen.getByText("S'inscrire"));

    await waitFor(() => {
      expect(registerService.createEntreprise).toHaveBeenCalled();
      expect(registerService.createAbonnement).toHaveBeenCalled();
      expect(registerService.createPaiement).toHaveBeenCalled();
      expect(registerService.createEmploye).toHaveBeenCalled();
      expect(onSwitch).toHaveBeenCalled();
    });
  });

  test("affiche une erreur si les mots de passe ne correspondent pas", async () => {
    // Naviguer jusqu'à l'étape 3
    fireEvent.change(screen.getByLabelText("Nom de l'entreprise"), { target: { value: "Test Entreprise" } });
    fireEvent.change(screen.getByLabelText("NIF"), { target: { value: "123456" } });
    fireEvent.change(screen.getByLabelText("Type d'accès"), { target: { value: "1" } });
    fireEvent.click(screen.getByText("Suivant"));

    await waitFor(() => screen.getByLabelText("Date début"));
    fireEvent.change(screen.getByLabelText("Date début"), { target: { value: "2025-10-15" } });
    fireEvent.change(screen.getByLabelText("Date fin"), { target: { value: "2025-11-15" } });
    fireEvent.change(screen.getByLabelText("Montant"), { target: { value: "10000" } });
    fireEvent.change(screen.getByLabelText("Mode de paiement"), { target: { value: "1" } });
    fireEvent.click(screen.getByText("Suivant"));

    await waitFor(() => screen.getByLabelText("Nom administrateur"));
    fireEvent.change(screen.getByLabelText("Nom administrateur"), { target: { value: "Admin Test" } });
    fireEvent.change(screen.getByLabelText("Email administrateur"), { target: { value: "admin@test.com" } });
    fireEvent.change(screen.getByLabelText("Mot de passe"), { target: { value: "123456" } });
    fireEvent.change(screen.getByLabelText("Confirmer mot de passe"), { target: { value: "654321" } });

    fireEvent.click(screen.getByText("S'inscrire"));

    await waitFor(() => {
      expect(screen.getByText(/Les mots de passe ne correspondent pas/i)).toBeInTheDocument();
    });
  });
});
