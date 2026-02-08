import { clerkClient } from "@clerk/nextjs/server";
import Header from "@/components/home/home-header";
import PricingCard from "@/components/pricing-card";
import { Badge } from "@/components/ui/badge";

export default async function PricingPage() {
  const clerkPlans = await (await clerkClient()).billing.getPlanList();
  return (
    <div className="min-h-screen bg-white  py-20 lg:py-40">
      <Header />
      <section className="container mx-auto pt-10 md:pt-5">
        <div className="flex text-center justify-center items-center gap-4 flex-col">
          <Badge>Pricing</Badge>
          <div className="flex gap-2 flex-col">
            <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-center font-regular">
              Prices that make sense!
            </h2>
            <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl text-center">
              Managing a small business today is already tough.
            </p>
          </div>
          <div className="grid pt-20 text-left grid-cols-1 lg:grid-cols-3 w-full gap-8">
            {clerkPlans.data.map((plan) => (
              <PricingCard key={plan.name} plan={plan} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
