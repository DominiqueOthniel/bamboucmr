import { Suspense } from "react";
import Image from "next/image";
import { LoginForm } from "@/components/admin/LoginForm";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sand via-paper to-shoot/10 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))] sm:p-6">
      <div className="w-full max-w-md rounded-2xl border border-line bg-surface p-6 shadow-lg sm:p-8">
        <div className="mb-6 flex flex-col items-center text-center sm:mb-8">
          <Image
            src="/logo.jpg"
            alt="BambouCamer"
            width={72}
            height={72}
            className="h-14 w-14 rounded-full object-cover ring-2 ring-bamboo/25 shadow-md sm:h-16 sm:w-16"
            priority
          />
          <h1 className="mt-4 font-display text-xl font-bold text-forest sm:text-2xl">
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
