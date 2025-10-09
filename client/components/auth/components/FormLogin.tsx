"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEnvelope, FaLock, FaEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { AuthService } from "../services/auth.service";
import { LoginDto, UserInfo } from "../types/auth";
import { useAuth } from "@/contexts/AuthContext";

interface FormLoginProps {
  onForgot?: () => void;
}

export default function FormLogin({ onForgot }: FormLoginProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState<LoginDto>({ email: "", password: "" });

  const { setUser } = useAuth();
  const togglePasswordVisibility = () => setShowPassword(prev => !prev);

 const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
    const res = await AuthService.login(login);
    console.log("✅ Réponse API :", res);

    if (res.success) {
      // ⚠️ On prend directement les infos dans res.data
      const { id, nom, email, role, type } = res.data;

      // Déterminer le type pour le menu
      let userType: UserInfo["type"] = "client";
      if (role.toLowerCase() === "superadmin") userType = "superadmin";
      else if (role.toLowerCase() === "admin") userType = "admin";
      else if (role.toLowerCase() === "client") userType = "client";

      const userObj = { id, nom, email, type: userType, role };
      setUser(userObj);
      localStorage.setItem("user", JSON.stringify(userObj));

      // Redirection selon le type
      switch (userType) {
        case "superadmin":
          router.push("/management/dashboardSuperAdmin");
          break;
        case "admin":
          router.push("/management/dashboardAdmin");
          break;
        case "client":
          router.push("/management/client");
          break;
        default:
          router.push("/");
      }
    } else {
      toast.error(res.message || "Échec de la connexion");
    }
  } catch (err: any) {
    console.error("❌ Erreur login :", err);
    toast.error(err.message || "Erreur lors de la connexion");
  }
};

  return (
    <form className="flex flex-col gap-4 w-full max-w-md" onSubmit={handleLogin}>
      <h2 className="text-2xl font-bold text-gray-700">Authentification</h2>

      <div className="flex items-center bg-gray-200 rounded-full px-4 h-14">
        <FaEnvelope className="text-gray-500 mr-2" />
        <input
          type="email"
          placeholder="Email"
          className="bg-transparent outline-none flex-1"
          onChange={e => setLogin({ ...login, email: e.target.value })}
        />
      </div>

      <div className="flex items-center bg-gray-200 rounded-full px-4 h-14 relative">
        <FaLock className="text-gray-500 mr-2" />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Mot de passe"
          className="bg-transparent outline-none flex-1"
          onChange={e => setLogin({ ...login, password: e.target.value })}
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
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-full h-12"
      >
        Connexion
      </button>

      {onForgot && (
        <button
          type="button"
          onClick={onForgot}
          className="text-sm text-blue-600 font-medium hover:underline mt-2 self-end"
        >
          Mot de passe oublié ?
        </button>
      )}
    </form>
  );
}
