import { auth } from "@clerk/nextjs/server";
import { addWeeks, startOfWeek } from "date-fns";
import { redirect } from "next/navigation";
import { getGoogleBusyTimes } from "@/lib/actions/calendar";
import { processBookingsWithStatuses } from "@/lib/booking";
import type { BookedBlock, BusyBlock, TimeBlock } from "@/lib/types";
import { sanityFetch } from "@/sanity/lib/live";
import { HOST_UPCOMING_BOOKINGS_QUERY } from "@/sanity/queries/booking";
import { USER_WITH_AVAILABILITY_QUERY } from "@/sanity/queries/user";

export default async function AvailabilityPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  // Fetch availability, bookings, and Google busy times in parallel
  const now = new Date();
  const rangeStart = startOfWeek(now);
  const rangeEnd = addWeeks(rangeStart, 8); // 8 weeks ahead

  const [{ data: user }, { data: bookings }, busyTimes] = await Promise.all([
    sanityFetch({
      query: USER_WITH_AVAILABILITY_QUERY,
      params: { clerkId: userId },
    }),
    sanityFetch({
      query: HOST_UPCOMING_BOOKINGS_QUERY,
      params: { clerkId: userId, startDate: rangeStart.toISOString() },
    }),
    getGoogleBusyTimes(rangeStart, rangeEnd),
  ]);

  const availability = user?.availability ?? [];

  // Process bookings with Google Calendar statuses
  const { activeBookings } = await processBookingsWithStatuses(bookings ?? []);

  // Transform to BookedBlock format
  const bookedBlocks: BookedBlock[] = activeBookings.map((booking) => ({
    id: booking._id,
    start: new Date(booking.startTime),
    end: new Date(booking.endTime),
    guestName: booking.guestName,
    guestEmail: booking.guestEmail,
    googleEventId: booking.googleEventId ?? undefined,
    meetLink: booking.meetLink ?? undefined,
    attendeeStatus: booking.guestStatus,
  }));

  // Transform Sanity data to TimeBlock format
  // We show the FULL availability as stored in Sanity (bookings are displayed separately as green blocks)
  const initialBlocks: TimeBlock[] = availability.map((slot) => ({
    id: slot._key,
    start: new Date(slot.startDateTime),
    end: new Date(slot.endDateTime),
  }));

  // Filter out busy times that overlap with our bookings (to avoid duplication)
  const isOverlappingWithBooking = (busyStart: Date, busyEnd: Date) =>
    bookedBlocks.some(
      (booking) => busyStart < booking.end && busyEnd > booking.start,
    );

  // Transform busy times to BusyBlock format (excluding our own bookings)
  const initialBusyBlocks: BusyBlock[] = busyTimes
    .filter(
      (busy) =>
        !isOverlappingWithBooking(new Date(busy.start), new Date(busy.end)),
    )
    .map((busy, index) => ({
      id: `busy-${index}`,
      start: new Date(busy.start),
      end: new Date(busy.end),
      title: busy.title,
      accountEmail: busy.accountEmail,
    }));

  return (
    <section>
      <h1>Availability Page</h1>
    </section>
  );
}
