import { Suspense } from "react";
import { LoginForm } from "@/components/admin/LoginForm";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sand via-paper to-shoot/10 p-6">
      <div className="w-full max-w-md rounded-2xl border border-line bg-surface p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="font-display text-2xl font-bold text-forest">
            Bambou<span className="text-bamboo">Camer</span>
          </h1>
          <p className="mt-2 text-sm text-muted">Espace d&apos;administration</p>
        </div>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
