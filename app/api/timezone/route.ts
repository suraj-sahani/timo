import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const current = cookieStore.get("timezone")?.value;
  if (current === timezone) return;
  cookieStore.set("timezone", timezone, {
    path: "/",
    maxAge: 31536000,
    sameSite: "lax",
  });

  return NextResponse.json({ timezone });
}
