import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import { Activity } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface FeatureCardProps {
  index: number;
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  image,
}: FeatureCardProps) {
  return (
    <Card className="border-secondary-200/20 border-2 transition-shadow hover:shadow-100 p-1 gap-2 group">
      <CardHeader className="p-1">
        <Activity mode={image ? "visible" : "hidden"}>
          <Image
            src={image || ""}
            width={400}
            height={250}
            alt={title}
            className="rounded-xl h-60 w-100 object-cover group-hover:scale-105 transition-all duration-200"
          />
        </Activity>

        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="-mt-2 p-1">
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
