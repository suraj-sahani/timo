import { SignedIn } from "@clerk/nextjs";
import { CheckoutButton } from "@clerk/nextjs/experimental";
import { Check, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { BillingPlan } from "@/lib/types";

type Props = {
  plan: BillingPlan;
};

export default function PricingCard({
  plan: { name, description, features, id, fee },
}: Props) {
  const { currencySymbol, amountFormatted } = fee;
  return (
    <Card className="w-full rounded-4xl border-3 border-secondary-100/40 shadow-100! p-2 justify-between">
      <CardHeader className="p-2">
        <CardTitle className="text-2xl">{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-2">
        <div className="flex flex-col gap-8 justify-start">
          <p className="flex flex-row  items-center gap-2 text-xl">
            <span className="text-4xl">
              {currencySymbol}
              {amountFormatted}
            </span>
            <span className="text-sm text-muted-foreground"> / month</span>
          </p>

          {/* Features */}
          <div className="flex flex-col gap-4 justify-start">
            {features.map((feature) => (
              <div
                className="flex items-center flex-row gap-4"
                key={feature.id}
              >
                <Check className="w-4 h-4 mt-2 text-primary" />
                <div className="flex flex-col">
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          <SignedIn>
            <CheckoutButton
              planId={id}
              planPeriod="month"
              checkoutProps={{
                appearance: {
                  elements: {
                    checkoutFormElementsRoot: {
                      zIndex: 999,
                    },
                    drawerRoot: {
                      zIndex: 999,
                    },
                    drawerContent: {
                      borderRadius: "2rem",
                    },
                  },
                },
              }}
            >
              <Button className="rounded-full" size="lg">
                Subscribe
              </Button>
            </CheckoutButton>
          </SignedIn>
        </div>
      </CardContent>
    </Card>
  );
}
