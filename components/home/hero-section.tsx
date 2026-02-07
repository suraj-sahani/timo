import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroVisual } from "./hero-visual";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_60%,rgba(59,130,246,0.12),transparent)]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-100/50 px-4 py-1.5 text-sm font-medium text-primary-600">
            <Sparkles className="size-4 animate-rotate" />
            Scheduling made simple
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-secondary-900 sm:text-6xl">
            Schedule meetings{" "}
            <span className="text-primary-500">without the back-and-forth</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-secondary-500 ">
            Timo connects to your Google Calendar, shows your real-time
            availability, and lets anyone book time with you instantly. No more
            &quot;what time works for you?&quot; emails.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <SignedOut>
              <SignUpButton mode="modal">
                <Button
                  size="lg"
                  className="w-full bg-secondary-600 text-base hover:bg-primary-600 rounded-full sm:w-auto"
                >
                  Start Scheduling Free
                </Button>
              </SignUpButton>
              <SignInButton mode="modal">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full text-base sm:w-auto rounded-full border-2"
                >
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Button
                asChild
                size="lg"
                className="w-full bg-secondary-600 text-base hover:bg-primary-600 rounded-full sm:w-auto"
              >
                <Link href="/availability">Go to Dashboard</Link>
              </Button>
            </SignedIn>
          </div>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}
