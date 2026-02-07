import { GoogleLogo } from "@/public";
import { Calendar, Link2, Shield, Users, Video } from "lucide-react";
import Image from "next/image";

const integrationFeatures = [
  { icon: Shield, text: "Secure OAuth 2.0 authentication" },
  { icon: Users, text: "Multiple Google accounts support" },
  { icon: Video, text: "Auto-generated Google Meet links" },
  { icon: Link2, text: "Real-time attendee status tracking" },
];

const calendarEvents = [
  { time: "9:00 AM", event: "Team Standup", color: "blue" },
  { time: "11:00 AM", event: "Client Call", color: "green" },
  { time: "2:00 PM", event: "Available", color: "emerald" },
  { time: "4:00 PM", event: "Review Meeting", color: "purple" },
];

function getColorClass(color: string) {
  switch (color) {
    case "blue":
      return "bg-blue-500";
    case "green":
      return "bg-green-500";
    case "emerald":
      return "bg-emerald-500";
    case "purple":
      return "bg-purple-500";
    default:
      return "bg-zinc-500";
  }
}

export function Integrations() {
  return (
    <section className="py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-4xl border-3 border-secondary-100/20 bg-white p-4 shadow-100">
            <div className="flex items-center gap-3 border-b pb-4">
              <div className="flex size-10 items-center justify-center rounded-lg">
                <Image
                  src={GoogleLogo}
                  alt="google logo"
                  height={50}
                  width={50}
                />
              </div>
              <div>
                <div className="font-semibold text-zinc-900">
                  Google Calendar
                </div>
                <div className="mt-0.5 py-0.5 px-1 text-xs bg-green-500/30 w-fit rounded-full animate-pulse font-medium text-green-600">
                  Connected
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-3">
              {calendarEvents.map((slot) => (
                <div
                  key={slot.time}
                  className="flex items-center gap-3 rounded-xl border bg-secondary-100/25 p-4 group"
                >
                  <div
                    className={`size-2 rounded-full ${getColorClass(slot.color)}`}
                  />
                  <div className="text-sm font-medium text-zinc-500">
                    {slot.time}
                  </div>
                  <div className="text-md text-secondary-600 font-semibold group-hover:translate-x-2 duration-200 ease-in-out">
                    {slot.event}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
              Seamless Google Calendar integration
            </h2>
            <p className="mt-4 text-lg text-secondary-300">
              Connect multiple Google accounts and let Timo do the heavy
              lifting. Your busy times are automatically blocked, and new
              bookings create calendar events with video links.
            </p>
            <ul className="mt-8 space-y-4">
              {integrationFeatures.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.text} className="flex items-center gap-3">
                    <div className="flex p-2 items-center justify-center rounded-full bg-green-500/10">
                      <Icon className="size-4 text-green-600" />
                    </div>
                    <span className="text-secondary-700 text-sm font-medium ">
                      {item.text}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
