import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const current = cookieStore.get("timezone")?.value || "UTC";

  // Send the existing set timezone
  if (current === timezone) return NextResponse.json({ current });

  // Set the tiezone cookie if was not set before.
  cookieStore.set("timezone", timezone, {
    maxAge: 31536000,
  });

  return NextResponse.json({ timezone });
}
