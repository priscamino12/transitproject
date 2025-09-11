export const translations = {
  fr: {
    // Navigation
    dashboard: "Tableau de bord",
    clients: "Clients",
    transport: "Transport",
    aerial: "Aérien",
    maritime: "Maritime",
    transactions: "Transactions",
    tracking: "Suivi",
    documents: "Documents",
    settings: "Paramètres",
    logout: "Déconnexion",

    // Common
    add: "Ajouter",
    edit: "Modifier",
    delete: "Supprimer",
    view: "Afficher",
    search: "Rechercher",
    export: "Exporter",

    // Tracking stages
    validation: "Validation",
    preparation: "Préparation",
    customs: "Douane",
    expedition: "Expédition",
    arrival: "Arrivé au port d'arrivé",
    delivery: "Livraison",

    // Documents
    aerialDocuments: "Documents aériens",
    maritimeDocuments: "Documents maritimes",
    mawbInvoice: "Facture MAWB",
    hawbInvoice: "Facture HAWB",
    mblInvoice: "Facture MBL",
    hblInvoice: "Facture HBL",

    // Profile
    profile: "Profil",
    notifications: "Notifications",
    darkMode: "Mode sombre",
    lightMode: "Mode clair",
  },
  en: {
    // Navigation
    dashboard: "Dashboard",
    clients: "Clients",
    transport: "Transport",
    aerial: "Aerial",
    maritime: "Maritime",
    transactions: "Transactions",
    tracking: "Tracking",
    documents: "Documents",
    settings: "Settings",
    logout: "Logout",

    // Common
    add: "Add",
    edit: "Edit",
    delete: "Delete",
    view: "View",
    search: "Search",
    export: "Export",

    // Tracking stages
    validation: "Validation",
    preparation: "Preparation",
    customs: "Customs",
    expedition: "Expedition",
    arrival: "Arrival at destination port",
    delivery: "Delivery",

    // Documents
    aerialDocuments: "Aerial Documents",
    maritimeDocuments: "Maritime Documents",
    mawbInvoice: "MAWB Invoice",
    hawbInvoice: "HAWB Invoice",
    mblInvoice: "MBL Invoice",
    hblInvoice: "HBL Invoice",

    // Profile
    profile: "Profile",
    notifications: "Notifications",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
  },
}

export type Language = keyof typeof translations
