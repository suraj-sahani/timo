import { ClerkProvider } from "@clerk/nextjs";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClerkProvider>{children}</ClerkProvider>;
}
