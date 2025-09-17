"use client";

import { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaRegEyeSlash, FaCheckCircle, FaFacebookF, FaGoogle, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { useRouter } from "next/navigation";
import api from "@/app/axiosInstance";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import { AccountService } from "@/_services/Account.service";
import {jwtDecode} from "jwt-decode";
import { GoArrowLeft } from "react-icons/go";

export default function Formulaire() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1); // 1: Email, 2: Code+Password
  const [token, setToken] = useState("");
  const [valideEmail, setValideEmail] = useState(true);

  const [login, setLogin] = useState({ email: "", password: "" });

  // Redirection accueil
  const retourAcceuil = () => router.push("/");

  // Toggle mot de passe visible
  const togglePasswordVisibility = () => setShowPassword(prev => !prev);

  // Envoi email pour mot de passe oublié
  const handleEmailSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!email) return;
    setValideEmail(false);
    try {
      const res = await api.post("/employe/forgot", { email });
      setToken(res.data.token);
      toast.success("Email envoyé avec succès");
      setValideEmail(true);
      setStep(2);
    } catch (error: any) {
      const message = error.response?.data?.error || "Erreur lors de l'envoi";
      Swal.fire({ icon: "error", title: "Erreur", text: message, timer: 3000 });
      setValideEmail(true);
    }
  };

  // Réinitialisation mot de passe
  const handlePasswordSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!newPassword || !code) return toast.error("Tout les champs sont requis");
    if (newPassword !== confirmPassword) return toast.error("Les mots de passe ne correspondent pas");

    try {
      const res = await api.post("/employe/reset", { token, newPassword, email, codeTemp: code });
      Swal.fire({ icon: "success", title: "Modifié", text: "Mot de passe changé avec succès" });
      if (res.status === 200) {
        AccountService.saveToken(res.data.token);
        const decoded: any = jwtDecode(res.data.token);
        localStorage.setItem("userName", decoded.nom);
        localStorage.setItem("userType", decoded.type);
        router.push("/admin/dashboard");
      }
    } catch (error: any) {
      const msg = error.response?.data?.error || "Erreur lors de la réinitialisation";
      Swal.fire({ icon: "error", title: "Erreur", text: msg });
    }
  };

  // Annuler mot de passe oublié
  const cancelPasswordSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setStep(1);
    setEmail("");
  };

  // Login
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await api.post("/employe/login", login);
      if (res.status === 200) {
        AccountService.saveToken(res.data.token);
        const decoded: any = jwtDecode(res.data.token);
        localStorage.setItem("userName", decoded.nom);
        localStorage.setItem("userType", decoded.type);
        router.push("/admin/dashboard");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Erreur lors de la connexion");
    }
  };

  return (
    <div className="forms-container relative flex-1 flex justify-center items-center">
      <button onClick={retourAcceuil} className="absolute top-4 left-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 z-10 flex items-center">
        <GoArrowLeft className="h-6 w-6 mr-2 text-white" /> Retour
      </button>

      <div className="signin-signup w-full max-w-md">
        {/* Formulaire Login */}
        <form className="sign-in-form flex flex-col gap-4" onSubmit={handleLogin}>
          <h2 className="text-2xl font-bold text-gray-700">Authentification</h2>
          <div className="input-field relative flex items-center bg-gray-200 rounded-full px-4 h-14">
            <FaEnvelope className="text-gray-500 mr-2" />
            <input type="email" placeholder="Email" className="bg-transparent outline-none flex-1" onChange={e => setLogin({ ...login, email: e.target.value })} />
          </div>
          <div className="input-field relative flex items-center bg-gray-200 rounded-full px-4 h-14">
            <FaLock className="text-gray-500 mr-2" />
            <input type={showPassword ? "text" : "password"} placeholder="Mot de passe" className="bg-transparent outline-none flex-1" onChange={e => setLogin({ ...login, password: e.target.value })} />
            <button type="button" className="absolute right-4" onClick={togglePasswordVisibility}>
              {showPassword ? <FaRegEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button type="submit" className="btn bg-blue-500 hover:bg-blue-600 text-white rounded-full h-12">Connexion</button>
          <div className="text-right text-blue-500 cursor-pointer" onClick={() => setStep(1)}>Mot de passe oublié ?</div>
          <p className="text-center my-2">Ou se connecter avec un autre réseau</p>
          <div className="flex justify-center gap-2">
            <FaFacebookF className="p-2 bg-gray-200 rounded-full cursor-pointer" />
            <FaTwitter className="p-2 bg-gray-200 rounded-full cursor-pointer" />
            <FaGoogle className="p-2 bg-gray-200 rounded-full cursor-pointer" />
            <FaLinkedinIn className="p-2 bg-gray-200 rounded-full cursor-pointer" />
          </div>
        </form>

        {/* Mot de passe oublié */}
        {step >= 1 && (
          <form className="sign-up-form flex flex-col gap-4 mt-4">
            {step === 1 && (
              <>
                <h2 className="text-2xl font-bold">Mot de passe oublié</h2>
                {valideEmail ? (
                  <>
                    <p className="text-gray-500">Entrez votre email professionnel</p>
                    <div className="input-field relative flex items-center bg-gray-200 rounded-full px-4 h-14">
                      <FaEnvelope className="text-gray-500 mr-2" />
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="bg-transparent outline-none flex-1" placeholder="Email" />
                    </div>
                    <button className="btn bg-blue-500 hover:bg-blue-600 text-white rounded-full h-12" onClick={handleEmailSubmit}>Envoyer</button>
                  </>
                ) : (
                  <div className="loader"></div>
                )}
              </>
            )}
            {step === 2 && (
              <>
                <h2 className="text-2xl font-bold">Réinitialisation du mot de passe</h2>
                <div className="input-field relative flex items-center bg-gray-200 rounded-full px-4 h-14">
                  <FaCheckCircle className="text-gray-500 mr-2" />
                  <input type="text" maxLength={6} placeholder="Code de vérification" value={code} onChange={e => setCode(e.target.value)} className="bg-transparent outline-none flex-1" />
                </div>
                <div className="input-field relative flex items-center bg-gray-200 rounded-full px-4 h-14">
                  <FaLock className="text-gray-500 mr-2" />
                  <input type="password" placeholder="Nouveau mot de passe" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="bg-transparent outline-none flex-1" />
                </div>
                <div className="input-field relative flex items-center bg-gray-200 rounded-full px-4 h-14">
                  <FaLock className="text-gray-500 mr-2" />
                  <input type="password" placeholder="Confirmer nouveau mot de passe" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="bg-transparent outline-none flex-1" />
                </div>
                <button className="btn bg-blue-500 hover:bg-blue-600 text-white rounded-full h-12" onClick={handlePasswordSubmit}>Valider</button>
                <button className="btn bg-gray-400 hover:bg-gray-500 text-white rounded-full h-12" onClick={cancelPasswordSubmit}>Annuler</button>
              </>
            )}
          </form>
        )}
      </div>

      <ToastContainer />
    </div>
  );
}
