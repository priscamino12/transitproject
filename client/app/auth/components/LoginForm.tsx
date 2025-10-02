"use client";

import { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { loginEmployee } from "@/services/authService";
import { LoginData } from "@/types/employee";

interface Props {
  onForgot: () => void;
}

export default function LoginForm({ onForgot }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await loginEmployee({ email, password } as LoginData);
      localStorage.setItem("user", JSON.stringify(user));
      router.push("/management/dashboard");
    } catch (err: any) {
      console.error(err);
      const message = err.response?.data?.message?.message || err.response?.data?.error || "Identifiants invalides";
      toast.error(message, { position: "top-right", autoClose: 3000 });
    }
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit} className="space-y-8 max-w-lg mx-auto w-full">
        <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">Connexion</h2>

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
          <button type="button" onClick={() => setShow(!show)} className="absolute right-4 top-6 text-gray-500 hover:text-gray-700">
            {show ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button type="submit" className="w-full rounded-xl bg-blue-600 py-4 text-lg text-white font-semibold hover:bg-blue-700 transition">
          Se connecter
        </button>

        <p className="text-center text-base">
          Mot de passe oublié ?{" "}
          <button type="button" onClick={onForgot} className="text-blue-600 hover:underline font-medium">
            Réinitialiser
          </button>
        </p>
      </form>
    </>
  );
}
