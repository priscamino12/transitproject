"use client";

import { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import api from "@/app/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  onBack: () => void;
}

export default function ForgotForm({ onBack }: Props) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPass, setNewPass] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false); // état pour désactiver le bouton

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (step === 1) {
        setLoading(true); // désactive le bouton
        // Envoi de l'email et récupération du token
        const res = await api.post("/employe/forgot", { email });
        setToken(res.data.token);

        toast.success("Code envoyé à votre email !", {
          position: "top-right",
          autoClose: 2500,
        });

        setStep(2);
        setLoading(false); // réactive le bouton
      } else {
        setLoading(true);
        // Réinitialisation du mot de passe avec token et code
        await api.post("/employe/reset", {
          email,
          codeTemp: code,
          newPassword: newPass,
          token,
        });

        toast.success("Mot de passe réinitialisé !", {
          position: "top-right",
          autoClose: 2500,
        });

        setTimeout(() => {
          onBack();
        }, 500);
      }
    } catch (err: any) {
      setLoading(false);
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Erreur lors de la réinitialisation";

      toast.error(message, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="space-y-8 max-w-lg mx-auto w-full animate-fadeIn"
      >
        <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">
          {step === 1
            ? "Réinitialiser le mot de passe"
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
          <>
            <div className="relative">
              <FaLock className="absolute left-4 top-4 text-gray-400 text-lg" />
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Code de vérification"
                required
                className="w-full rounded-xl border border-gray-300 pl-12 pr-4 py-4 text-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>
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
          </>
        )}

        <button
          type="submit"
          disabled={loading} // désactivation si loading
          className={`w-full rounded-xl py-4 text-lg text-white font-semibold transition ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading
            ? step === 1
              ? "Envoi en cours..."
              : "Réinitialisation en cours..."
            : step === 1
            ? "Envoyer le code"
            : "Réinitialiser le mot de passe"}
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
    </>
  );
}
