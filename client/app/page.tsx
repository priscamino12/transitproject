import { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/auth"); // redirige automatiquement vers la page publique
}