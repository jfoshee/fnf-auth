"use client";

import { Button } from "@/src/components/ui/button";
import { useClerk } from "@clerk/nextjs";
import { useSignIn } from "@clerk/nextjs/legacy";
import { useSearchParams } from "next/navigation";

export default function AuthPage() {
  const clerk = useClerk();
  const { signIn } = useSignIn();

  const isLoaded = clerk.loaded;
  const searchParams = useSearchParams();
  const redirectParam = searchParams.get("redirect_url");

  const handleSignIn = async () => {
    signIn?.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/auth/sso-callback",
      redirectUrlComplete: redirectParam || "/",
    });

  if (!signIn || !isLoaded) return null;

  return (
    <div className="flex justify-center items-center h-screen">
      <Button variant="outline" onClick={handleSignIn}>
        Continue with Google
      </Button>
    </div>
  );
}
