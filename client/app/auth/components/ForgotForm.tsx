"use client";

import { useState } from "react";
import { FaEnvelope, FaKey, FaLock } from "react-icons/fa";

interface Props {
  onBack: () => void;
}

export default function ForgotForm({ onBack }: Props) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPass, setNewPass] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      console.log("Code envoyé à :", email);
      setStep(2);
    } else if (step === 2) {
      console.log("Vérification du code :", code);
      setStep(3);
    } else {
      console.log("Nouveau mot de passe :", newPass);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 max-w-lg mx-auto w-full animate-fadeIn"
    >
      <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">
        {step === 1
          ? "Réinitialiser le mot de passe"
          : step === 2
          ? "Entrez le code de vérification"
          : "Définir un nouveau mot de passe"}
      </h2>

      {step === 1 && (
        <div className="relative">
          <FaEnvelope className="absolute left-4 top-4 text-gray-400 text-lg" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre email"
            required
            className="w-full rounded-xl border border-gray-300 pl-12 pr-4 py-4 text-lg focus:ring-2 focus:ring-blue-400"
          />
        </div>
      )}

      {step === 2 && (
        <div className="relative">
          <FaKey className="absolute left-4 top-4 text-gray-400 text-lg" />
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Code de vérification"
            required
            className="w-full rounded-xl border border-gray-300 pl-12 pr-4 py-4 text-lg focus:ring-2 focus:ring-blue-400"
          />
        </div>
      )}

      {step === 3 && (
        <div className="relative">
          <FaLock className="absolute left-4 top-4 text-gray-400 text-lg" />
          <input
            type="password"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            placeholder="Nouveau mot de passe"
            required
            className="w-full rounded-xl border border-gray-300 pl-12 pr-4 py-4 text-lg focus:ring-2 focus:ring-blue-400"
          />
        </div>
      )}

      <button
        type="submit"
        className="w-full rounded-xl bg-blue-600 py-4 text-lg text-white font-semibold hover:bg-blue-700 transition"
      >
        {step === 1
          ? "Envoyer le code"
          : step === 2
          ? "Vérifier le code"
          : "Changer le mot de passe"}
      </button>

      <p className="text-center text-base">
        <button
          type="button"
          onClick={onBack}
          className="text-blue-600 hover:underline font-medium"
        >
          Retour à la connexion
        </button>
      </p>
    </form>
  );
}
