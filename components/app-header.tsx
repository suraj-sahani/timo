"use client";

import { UserButton } from "@clerk/nextjs";
import { Calendar, CalendarCheck, MessageSquare, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const leftNavItems = [
  { href: "/availability", label: "Availability", icon: Calendar },
  { href: "/bookings", label: "Bookings", icon: CalendarCheck },
];

const rightNavItems = [
  { href: "/feedback", label: "Feedback", icon: MessageSquare },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function AppHeader() {
  const pathname = usePathname();

  const renderNavItem = (item: (typeof leftNavItems)[number]) => {
    const isActive = pathname === item.href;
    const Icon = item.icon;

    return (
      <Link
        key={item.href}
        href={item.href}
        className={cn(
          "inline-flex items-center gap-2 rounded-full px-2 sm:px-3 py-2 text-sm font-medium transition-colors",
          isActive
            ? "bg-secondary-600 text-white hover:bg-secondary-500"
            : "text-secondary hover:bg-primary hover:text-white",
        )}
      >
        <Icon className="size-4" />
        <span className="hidden sm:inline">{item.label}</span>
      </Link>
    );
  };

  return (
    <header className="py-4">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 bg-white border-2 border-gray-200/50 shadow-100 rounded-full">
        <div className="flex items-center gap-4 sm:gap-8">
          <Link href="/availability" className="flex items-center gap-1">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="size-8"
              role="img"
              aria-label="calender"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M6.96006 2C7.37758 2 7.71605 2.30996 7.71605 2.69231V4.08883C8.38663 4.07692 9.13829 4.07692 9.98402 4.07692H14.016C14.8617 4.07692 15.6134 4.07692 16.284 4.08883V2.69231C16.284 2.30996 16.6224 2 17.0399 2C17.4575 2 17.7959 2.30996 17.7959 2.69231V4.15008C19.2468 4.25647 20.1992 4.51758 20.899 5.15838C21.5987 5.79917 21.8838 6.67139 22 8V9H2V8C2.11618 6.67139 2.4013 5.79917 3.10104 5.15838C3.80079 4.51758 4.75323 4.25647 6.20406 4.15008V2.69231C6.20406 2.30996 6.54253 2 6.96006 2Z"
                  className="fill-primary"
                ></path>{" "}
                <path
                  opacity="0.5"
                  d="M22 14V12C22 11.161 21.9873 9.66527 21.9744 9H2.00586C1.99296 9.66527 2.00564 11.161 2.00564 12V14C2.00564 17.7712 2.00564 19.6569 3.17688 20.8284C4.34813 22 6.23321 22 10.0034 22H14.0023C17.7724 22 19.6575 22 20.8288 20.8284C22 19.6569 22 17.7712 22 14Z"
                  className="fill-primary"
                ></path>{" "}
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16 13.25C16.4142 13.25 16.75 13.5858 16.75 14V15.25L18 15.25C18.4142 15.25 18.75 15.5858 18.75 16C18.75 16.4142 18.4142 16.75 18 16.75H16.75L16.75 18C16.75 18.4142 16.4142 18.75 16 18.75C15.5858 18.75 15.25 18.4142 15.25 18L15.25 16.75L14 16.75C13.5858 16.75 13.25 16.4142 13.25 16C13.25 15.5858 13.5858 15.25 14 15.25H15.25L15.25 14C15.25 13.5858 15.5858 13.25 16 13.25Z"
                  className="fill-primary"
                ></path>{" "}
              </g>
            </svg>

            <span className="text-xl font-bold tracking-tight text-primary-900">
              Timo
            </span>
          </Link>

          <nav className="flex items-center gap-0.5 sm:gap-1">
            {leftNavItems.map(renderNavItem)}
          </nav>
        </div>

        <div className="flex items-center gap-0.5 sm:gap-1">
          <nav className="flex items-center gap-0.5 sm:gap-1">
            {rightNavItems.map(renderNavItem)}
          </nav>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "size-8",
              },
            }}
          />
        </div>
      </div>
    </header>
  );
}
