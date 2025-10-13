# 🚀 Application Web — Client (Next.js) & Serveur (Nest.js)

## 🧩 Description du projet

Ce projet est une application web complète composée de deux parties :

- **Frontend (Client)** : Développé avec **Next.js**, il offre une interface utilisateur moderne et réactive.
- **Backend (Serveur)** : Développé avec **Nest.js**, il gère la logique métier, la base de données et l’authentification via JWT.

L’objectif de cette architecture est de séparer clairement la partie interface utilisateur et la partie serveur pour faciliter la maintenance, le déploiement et l’évolutivité.

---

## 🏗️ Architecture du projet


---

## ⚙️ Technologies utilisées

### Frontend (Next.js)
- **React 18**
- **Next.js 14**
- **Tailwind CSS**
- **Axios** (pour les appels API)
- **i18next** (pour la traduction multilingue)
- **httpOnly** (gestion de la session côté client)

### Backend (Nest.js)
- **Nest.js 10+**
- **Prisma ORM** avec **PostgreSQL**
- **JWT** & **httpOnly** (authentification)
- **Class Validator** (validation des DTOs)

---

## 🔧 Installation et exécution
cd server
npm install
cd ../client
npm install

## 🚀 Démarrer les applications
## Lancer le backend (Nest.js)
cd server
npm run start:dev
## Lancer le frontend (Next.js)
cd client
npm run dev
