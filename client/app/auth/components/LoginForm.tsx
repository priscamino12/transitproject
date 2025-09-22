"use client";

import { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import api from "@/app/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  onForgot: () => void;
}

export default function LoginForm({ onForgot }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await api.post("/employe/login", { email, password });

      if (res.status === 200) {
        const token = res.data.token;

        localStorage.setItem("token", token);
        const decoded: any = jwtDecode(token);
        localStorage.setItem("userName", decoded.nom);
        localStorage.setItem("userType", decoded.type);

        toast.success("Connexion réussie !", {
          position: "top-right",
          autoClose: 2000,
        });

        // Redirection après un petit délai pour que l'utilisateur voit le toast
        setTimeout(() => {
          window.location.href = "/admin/dashboard";
        }, 500);
      }
    } catch (err: any) {
      console.error("Erreur de connexion :", err);
      const message =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Identifiants invalides";

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
        className="space-y-8 max-w-lg mx-auto w-full"
      >
        <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">
          Connexion
        </h2>

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

        <div className="relative">
          <FaLock className="absolute left-4 top-4 text-gray-400 text-lg" />
          <input
            type={show ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            required
            className="w-full rounded-xl border border-gray-300 pl-12 pr-12 py-4 text-lg focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-4 top-6 text-gray-500 hover:text-gray-700"
          >
            {show ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-blue-600 py-4 text-lg text-white font-semibold hover:bg-blue-700 transition"
        >
          Se connecter
        </button>

        <p className="text-center text-base">
          Mot de passe oublié ?{" "}
          <button
            type="button"
            onClick={onForgot}
            className="text-blue-600 hover:underline font-medium"
          >
            Réinitialiser
          </button>
        </p>
      </form>
    </>
  );
}
