import { cn } from "@/lib/utils";

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Set Your Availability",
      description:
        "Use the visual calendar to drag and create time blocks when you're free to meet. Connect your Google Calendar to automatically block busy times.",
    },
    {
      number: "02",
      title: "Create Meeting Types",
      description:
        "Define different meeting types like consultations, quick chats, or discovery calls. Set custom durations for each type.",
    },
    {
      number: "03",
      title: "Share Your Link",
      description:
        "Share your personalized booking link. Guests select a meeting type, pick an available slot in their timezone, and book instantly.",
    },
    {
      number: "04",
      title: "Meet with Confidence",
      description:
        "Receive booking confirmations with auto-generated Google Meet links. Track attendee responses and manage all your bookings in one place.",
    },
  ];

  return (
    <section className="bg-zinc-50 py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            How Timo works
          </h2>
          <p className="mt-4 text-lg text-zinc-600">
            Get up and running in minutes. No complicated setup required.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-7xl mx-auto">
          {steps.map(({ title, description, number }, index) => (
            <ExplanationCard
              key={title}
              description={description}
              title={title}
              icon={number}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const ExplanationCard = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/step",
        (index === 0 || index === 4) && "lg:border-l",
        index < 4 && "lg:border-b",
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/step:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-linear-to-t from-neutral-100 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/step:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-linear-to-b from-neutral-100 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 text-4xl font-bold">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/step:h-8 w-1 rounded-tr-full rounded-br-full bg-secondary-300  group-hover/step:bg-primary-500 transition-all duration-200 origin-center" />
        <span className="group-hover/step:translate-x-2 transition duration-200 inline-block text-neutral-800">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
