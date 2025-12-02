// app/dashboard/page.tsx
import ProtectedClient from "@/components/ProtectedClient";
export default function DashboardPage() {
  return (
    <ProtectedClient>
      <div className="p-6 ">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p>Welcome to the admin dashboard.</p>
      </div>
    </ProtectedClient>
  );
}
