"use client";

import { CalendarCheckIcon } from "lucide-react";
import { DocumentCountCard } from "./document-card";

export function TotalBookingsCard() {
  return (
    <DocumentCountCard
      documentType="booking"
      title="Total Bookings"
      icon={CalendarCheckIcon}
    />
  );
}
