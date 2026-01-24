import type { SchemaTypeDefinition } from "sanity";
import { availabilitySlotSchema } from "./availabilitySlotSchema";
import { bookingSchema } from "./bookingSchema";
import { connectedAccountSchema } from "./connectedAccountSchema";
import { feedbackSchema } from "./feedbackSchema";
import { meetingSchema } from "./meetingSchema";
import { userSchema } from "./userSchema";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    userSchema,
    bookingSchema,
    feedbackSchema,
    meetingSchema,
    connectedAccountSchema,
    availabilitySlotSchema,
  ],
};
