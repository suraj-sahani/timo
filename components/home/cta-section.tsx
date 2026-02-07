import { SignedIn, SignedOut, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BGPattern } from "../bg-pattern";

export function CTASection() {
  return (
    <section className="bg-secondary-800 py-20 sm:py-24">
      {/* <BGPattern variant="grid" mask="fade-edges" fill="#fff" /> */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to simplify your scheduling?
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            Join thousands of professionals who save hours every week with Timo.
          </p>
          <div className="mt-10">
            <SignedOut>
              <SignUpButton mode="modal">
                <Button
                  size="lg"
                  className="bg-primary text-base text-white hover:bg-primary-100 hover:text-primary-800 rounded-full"
                >
                  Get Started Free
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Button
                asChild
                size="lg"
                className="bg-primary rounded-full text-base text-white hover:bg-primary-100 hover:text-primary-800"
              >
                <Link href="/availability">Go to Dashboard</Link>
              </Button>
            </SignedIn>
          </div>
        </div>
      </div>
    </section>
  );
}
