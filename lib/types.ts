import type { MeetingTypeForHost } from "@/sanity/queries/meetingTypes";
import type {
  HOST_BOOKINGS_BY_CLERK_ID_QUERYResult,
  HOST_BY_SLUG_WITH_TOKENS_QUERYResult,
  HOST_UPCOMING_BOOKINGS_QUERYResult,
  USER_CONNECTED_ACCOUNTS_DISPLAY_QUERYResult,
  USER_WITH_TOKENS_QUERYResult,
} from "@/sanity/types";

// ============================================================================
// User Types
// ============================================================================

// Derived type from USER_WITH_TOKENS_QUERY result
export type ConnectedAccountWithTokens = NonNullable<
  NonNullable<USER_WITH_TOKENS_QUERYResult>["connectedAccounts"]
>[number];

// Derived type for host with tokens (for booking actions)
export type HostWithTokens = NonNullable<HOST_BY_SLUG_WITH_TOKENS_QUERYResult>;

// Derived type for connected account display (without tokens)
export type ConnectedAccountDisplay = NonNullable<
  NonNullable<USER_CONNECTED_ACCOUNTS_DISPLAY_QUERYResult>["connectedAccounts"]
>[number];

// ============================================================================
// Features Types
// ============================================================================

export type PlanType = "free" | "starter" | "pro";

// ============================================================================
// Booking Types
// ============================================================================

/**
 * Minimal interface for any booking that has Google Calendar event data.
 * Compatible with both HostBooking and HostUpcomingBooking from Sanity.
 */
export type BookingWithGoogleEvent = Pick<
  HostBooking | HostUpcomingBooking,
  "_id" | "googleEventId" | "guestEmail"
>;

export type ProcessedBooking<T extends BookingWithGoogleEvent> = T & {
  guestStatus?: AttendeeStatus;
};

// Derived type for a single booking (for dashboard)
export type HostBooking =
  NonNullable<HOST_BOOKINGS_BY_CLERK_ID_QUERYResult>[number];

// Derived type for upcoming bookings (for availability calendar)
export type HostUpcomingBooking =
  NonNullable<HOST_UPCOMING_BOOKINGS_QUERYResult>[number];

// ============================================================================
// Meeting Types
// ============================================================================

// Uses same structure as MeetingTypeForHost since the projection is identical
export type MeetingTypePublic = MeetingTypeForHost;

// ============================================================================
// Calendar Types
// ============================================================================

// Attendee response status type
export type AttendeeStatus =
  | "accepted"
  | "declined"
  | "tentative"
  | "needsAction"
  | "unknown";

// A time block representing availability
export interface TimeBlock {
  id: string;
  start: Date;
  end: Date;
}

// A busy block from Google Calendar (read-only)
export interface BusyBlock {
  id: string;
  start: Date;
  end: Date;
  title: string;
  accountEmail: string;
}

// A booked meeting block (read-only, from Sanity bookings)
export interface BookedBlock {
  id: string;
  start: Date;
  end: Date;
  guestName: string;
  guestEmail: string;
  googleEventId?: string;
  /** Google Meet video conferencing link */
  meetLink?: string;
  /** Guest's response status from Google Calendar */
  attendeeStatus?: AttendeeStatus;
}

// Combined event type for the calendar
export type CalendarEvent = TimeBlock | BusyBlock | BookedBlock;

// Type guard to check if event is a busy block
export function isBusyBlock(event: CalendarEvent): event is BusyBlock {
  return "accountEmail" in event;
}

// Type guard to check if event is a booked block
export function isBookedBlock(event: CalendarEvent): event is BookedBlock {
  return "guestName" in event;
}

// Slot selection from calendar
export interface SlotInfo {
  start: Date;
  end: Date;
}

// Drag/resize interaction
export interface TimeBlockInteraction {
  event: TimeBlock;
  start: Date;
  end: Date;
}
