"use client";

import { useState } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import api from "@/app/axiosInstance";

interface Props {
  onSwitch: () => void;
}

export default function RegisterForm({ onSwitch }: Props) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [type, setType] = useState("employe"); // Ajout du type

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) return alert("Les mots de passe ne correspondent pas.");
    try {
      await api.post("/employe/register", { name, email, password, type });
      alert("Inscription réussie !");
      onSwitch();
    } catch (err: any) {
      alert(err.response?.data?.message || "Erreur d'inscription");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-lg mx-auto w-full animate-fadeIn">
      <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">
        Créer un compte
      </h2>

      <div className="relative">
        <FaUser className="absolute left-4 top-4 text-gray-400 text-lg" />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nom complet"
          required
          className="w-full rounded-xl border border-gray-300 pl-12 pr-4 py-4 text-lg focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="relative">
        <FaEnvelope className="absolute left-4 top-4 text-gray-400 text-lg" />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email professionnel"
          required
          className="w-full rounded-xl border border-gray-300 pl-12 pr-4 py-4 text-lg focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full rounded-xl border border-gray-300 p-4 text-lg focus:ring-2 focus:ring-blue-400"
      >
        <option value="employe">Employé</option>
        <option value="admin">Administrateur</option>
      </select>

      <div className="relative">
        <FaLock className="absolute left-4 top-4 text-gray-400 text-lg" />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de passe"
          required
          className="w-full rounded-xl border border-gray-300 pl-12 pr-4 py-4 text-lg focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="relative">
        <FaLock className="absolute left-4 top-4 text-gray-400 text-lg" />
        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="Confirmer le mot de passe"
          required
          className="w-full rounded-xl border border-gray-300 pl-12 pr-4 py-4 text-lg focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-blue-600 py-4 text-lg text-white font-semibold hover:bg-blue-700 transition"
      >
        S'inscrire
      </button>

      <p className="text-center text-base">
        Déjà un compte ?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="text-blue-600 hover:underline font-medium"
        >
          Se connecter
        </button>
      </p>
    </form>
  );
}
