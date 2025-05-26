import Dashboard from "@/components/ui/Dashboard";
import { Navbar } from "@/components/ui/Navbar";

export default async function Home() {
  return (
    <main>
      <Navbar />
      <Dashboard />
    </main>
  );
}
