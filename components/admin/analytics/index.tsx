"use client";

import { Suspense } from "react";
import { NewUsersCard } from "@/components/admin/analytics/new-users";
import { TotalBookingsCard } from "@/components/admin/analytics/total-bookings";
import { MostBookedDayCard } from "@/components/admin/analytics/most-booked-day";
import { TotalMeetingTypesCard } from "@/components/admin/analytics/total-meeting-types";
import { ConnectedAccountsCard } from "@/components/admin/analytics/connected-accounts";
import { BookingTrendCard } from "@/components/admin/analytics/booking-trend";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

function CardSkeleton({ className = "" }: { className?: string }) {
  return (
    <Card
      className={`min-h-[140px] bg-white/60 backdrop-blur-sm border-zinc-200/50 ${className}`}
    >
      <CardContent className="flex items-center justify-center h-full pt-6">
        <Spinner className="size-5 text-amber-500" />
      </CardContent>
    </Card>
  );
}

export function AnalyticsSection() {
  return (
    <>
      {/* Featured Card - Booking Trend */}
      <div className="md:col-span-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Suspense fallback={<CardSkeleton className="min-h-[180px]" />}>
          <BookingTrendCard />
        </Suspense>
      </div>

      {/* Row of stat cards */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-75">
        <Suspense fallback={<CardSkeleton />}>
          <NewUsersCard />
        </Suspense>
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
        <Suspense fallback={<CardSkeleton />}>
          <TotalBookingsCard />
        </Suspense>
      </div>

      {/* Paired row - same height */}
      <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
        <Suspense fallback={<CardSkeleton />}>
          <MostBookedDayCard />
        </Suspense>
        <Suspense fallback={<CardSkeleton />}>
          <TotalMeetingTypesCard />
        </Suspense>
      </div>

      <div className="md:col-span-2 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
        <Suspense fallback={<CardSkeleton />}>
          <ConnectedAccountsCard />
        </Suspense>
      </div>
    </>
  );
}
