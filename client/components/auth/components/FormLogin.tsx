"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FaEnvelope, FaLock, FaEye, FaRegEyeSlash } from "react-icons/fa";

// Typage simplifié pour l'exemple
interface LoginDto {
  email: string;
  motDePasse: string;
}

interface FormLoginProps {
  onForgot?: () => void;
}

export default function FormLogin({ onForgot }: FormLoginProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState<LoginDto>({ email: "", motDePasse: "" });

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Simuler une API login
    try {
      if (!login.email || !login.motDePasse) {
        toast.error("Veuillez remplir tous les champs");
        return;
      }

      // Ici tu peux mettre ton AuthService.login(login)
      console.log("Login:", login);
      toast.success("Connexion réussie !");
      router.push("/management/dashboard");
    } catch (err: any) {
      console.error("Erreur login :", err);
      toast.error(err?.message || "Erreur lors de la connexion");
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full">
      <h2 className="text-2xl font-bold text-gray-700 mb-6">Connexion</h2>

      <div className="flex items-center bg-gray-100 rounded-full px-4 h-14">
        <FaEnvelope className="text-gray-500 mr-2" />
        <input
          type="email"
          placeholder="Email"
          className="bg-transparent outline-none flex-1"
          onChange={(e) => setLogin({ ...login, email: e.target.value })}
        />
      </div>

      <div className="flex items-center bg-gray-100 rounded-full px-4 h-14 relative">
        <FaLock className="text-gray-500 mr-2" />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Mot de passe"
          className="bg-transparent outline-none flex-1"
          onChange={(e) => setLogin({ ...login, motDePasse: e.target.value })}
        />
        <button
          type="button"
          className="absolute right-4"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <FaRegEyeSlash /> : <FaEye />}
        </button>
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full h-12 mt-2 transition"
      >
        Se connecter
      </button>

      {onForgot && (
        <button
          type="button"
          onClick={onForgot}
          className="text-blue-600 hover:underline text-sm mt-2 self-end"
        >
          Mot de passe oublié ?
        </button>
      )}
    </form>
  );
}
