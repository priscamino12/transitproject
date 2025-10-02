"use client";

import { useState } from "react";
import { FaBuilding, FaEnvelope, FaCalendarAlt, FaMoneyBill, FaUser, FaLock } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import api from "@/config/axiosInstance";

export default function RegisterForm({ onSwitch }: { onSwitch: () => void }) {
  const [step, setStep] = useState(1);

  // Étape 1 - Infos entreprise
  const [nomEntreprise, setNomEntreprise] = useState("");
  const [emailEntreprise, setEmailEntreprise] = useState("");
  const [telEntreprise, setTelEntreprise] = useState("");
  const [adresseEntreprise, setAdresseEntreprise] = useState("");
  const [typeAcces, setTypeAcces] = useState("");

  // Étape 2 - Abonnement
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [montant, setMontant] = useState("");
  const [modePaiement, setModePaiement] = useState("");

  // Étape 3 - Compte admin
  const [nomAdmin, setNomAdmin] = useState("");
  const [emailAdmin, setEmailAdmin] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleNext = () => {
    if (step === 1) {
      if (!nomEntreprise || !emailEntreprise || !telEntreprise || !adresseEntreprise || !typeAcces) {
        return alert("Veuillez remplir tous les champs de l'entreprise.");
      }
    } else if (step === 2) {
      if (!dateDebut || !dateFin || !montant || !modePaiement) {
        return alert("Veuillez remplir tous les champs de l'abonnement.");
      }
    }
    setStep(prev => prev + 1);
  };

  const handlePrev = () => setStep(prev => prev - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nomAdmin || !emailAdmin || !password || !confirm) {
      return alert("Veuillez remplir tous les champs du compte administrateur.");
    }
    if (password !== confirm) return alert("Les mots de passe ne correspondent pas.");

    try {
      await api.post("/entreprise/register", {
        nomEntreprise,
        emailEntreprise,
        telEntreprise,
        adresseEntreprise,
        typeAcces,
        dateDebutAbonnement: dateDebut,
        dateFinAbonnement: dateFin,
        montantAbonnement: parseFloat(montant),
        modePaiement,
        admin: {
          nomAdmin,
          emailAdmin,
          motDePasse: password,
        },
      });
      alert("Entreprise inscrite avec succès !");
      onSwitch();
    } catch (err: any) {
      alert(err.response?.data?.message || "Erreur lors de l'inscription de l'entreprise.");
    }
  };

  return (
    <form className="max-w-xl mx-auto p-6 space-y-6 bg-white shadow-lg rounded-2xl animate-fadeIn" onSubmit={handleSubmit}>
      <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">Inscription Entreprise</h2>

      {/* Étape 1 - Infos entreprise */}
      {step === 1 && (
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="font-medium text-gray-700">Nom de l'entreprise</label>
            <div className="relative">
              <FaBuilding className="absolute left-4 top-4 text-gray-400 text-lg" />
              <input
                type="text"
                placeholder="Nom entreprise"
                value={nomEntreprise}
                onChange={e => setNomEntreprise(e.target.value)}
                className="w-full rounded-xl border border-gray-300 pl-12 pr-4 py-4 text-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-medium text-gray-700">Email entreprise</label>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-4 text-gray-400 text-lg" />
              <input
                type="email"
                placeholder="Email entreprise"
                value={emailEntreprise}
                onChange={e => setEmailEntreprise(e.target.value)}
                className="w-full rounded-xl border border-gray-300 pl-12 pr-4 py-4 text-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-medium text-gray-700">Téléphone</label>
            <PhoneInput
              country={'mg'}
              value={telEntreprise}
              onChange={phone => setTelEntreprise(phone)}
              inputStyle={{
                width: '100%',
                borderRadius: '12px',
                height: '56px',
                paddingLeft: '48px',
                fontSize: '16px',
                border: '1px solid #d1d5db'
              }}
              buttonStyle={{ border: 'none', background: 'transparent' }}
              dropdownStyle={{ borderRadius: '12px' }}
            />
          </div>

          <div className="space-y-1">
            <label className="font-medium text-gray-700">Adresse</label>
            <input
              type="text"
              placeholder="Adresse entreprise"
              value={adresseEntreprise}
              onChange={e => setAdresseEntreprise(e.target.value)}
              className="w-full rounded-xl border border-gray-300 p-4 text-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="space-y-1">
            <label className="font-medium text-gray-700">Type d'accès</label>
            <select
              value={typeAcces}
              onChange={e => setTypeAcces(e.target.value)}
              className="w-full rounded-xl border border-gray-300 p-4 text-lg focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Sélectionner un type d'accès</option>
              <option value="Simple">Simple</option>
              <option value="Premium">Premium</option>
              <option value="Entreprise">Entreprise</option>
            </select>
          </div>
        </div>
      )}

      {/* Étape 2 - Abonnement */}
      {step === 2 && (
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 space-y-1">
              <label className="font-medium text-gray-700">Date début abonnement</label>
              <input
                type="date"
                value={dateDebut}
                onChange={e => setDateDebut(e.target.value)}
                className="w-full rounded-xl border border-gray-300 p-4 text-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex-1 space-y-1">
              <label className="font-medium text-gray-700">Date fin abonnement</label>
              <input
                type="date"
                value={dateFin}
                onChange={e => setDateFin(e.target.value)}
                className="w-full rounded-xl border border-gray-300 p-4 text-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-medium text-gray-700">Montant abonnement</label>
            <input
              type="number"
              placeholder="Montant"
              value={montant}
              onChange={e => setMontant(e.target.value)}
              className="w-full rounded-xl border border-gray-300 p-4 text-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="space-y-1">
            <label className="font-medium text-gray-700">Mode de paiement</label>
            <select
              value={modePaiement}
              onChange={e => setModePaiement(e.target.value)}
              className="w-full rounded-xl border border-gray-300 p-4 text-lg focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Sélectionner le mode de paiement</option>
              <option value="Mobile Money">Mobile Money</option>
              <option value="Carte Bancaire">Carte Bancaire</option>
            </select>
          </div>
        </div>
      )}

      {/* Étape 3 - Compte admin */}
      {step === 3 && (
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="font-medium text-gray-700">Nom administrateur</label>
            <div className="relative">
              <FaUser className="absolute left-4 top-4 text-gray-400 text-lg" />
              <input
                type="text"
                placeholder="Nom admin"
                value={nomAdmin}
                onChange={e => setNomAdmin(e.target.value)}
                className="w-full rounded-xl border border-gray-300 pl-12 pr-4 py-4 text-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-medium text-gray-700">Email administrateur</label>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-4 text-gray-400 text-lg" />
              <input
                type="email"
                placeholder="Email admin"
                value={emailAdmin}
                onChange={e => setEmailAdmin(e.target.value)}
                className="w-full rounded-xl border border-gray-300 pl-12 pr-4 py-4 text-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-medium text-gray-700">Mot de passe</label>
            <div className="relative">
              <FaLock className="absolute left-4 top-4 text-gray-400 text-lg" />
              <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-300 pl-12 pr-4 py-4 text-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-medium text-gray-700">Confirmer mot de passe</label>
            <div className="relative">
              <FaLock className="absolute left-4 top-4 text-gray-400 text-lg" />
              <input
                type="password"
                placeholder="Confirmer mot de passe"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                className="w-full rounded-xl border border-gray-300 pl-12 pr-4 py-4 text-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
        </div>
      )}

      {/* Navigation étapes */}
      <div className="flex justify-between mt-6">
        {step > 1 && (
          <button type="button" onClick={handlePrev} className="px-6 py-3 rounded-xl bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition">
            Précédent
          </button>
        )}
        {step < 3 ? (
          <button type="button" onClick={handleNext} className="ml-auto px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
            Suivant
          </button>
        ) : (
          <button type="submit" className="ml-auto px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition">
            Terminer
          </button>
        )}
      </div>

      <p className="text-center text-base mt-4">
        Déjà un compte ?{" "}
        <button type="button" onClick={onSwitch} className="text-blue-600 hover:underline font-medium">
          Se connecter
        </button>
      </p>
    </form>
  );
}
