"use server";

import { client } from "@/sanity/lib/client";
import { mutateClient } from "@/sanity/lib/mutate-client";
import { USER_WITH_TOKENS_QUERY } from "@/sanity/queries/user";
import { auth } from "@clerk/nextjs/server";
import { revokeGoogleToken } from "../google-calendar";

/**
 * Disconnect a Google account
 */
export async function disconnectGoogleAccount(
  accountKey: string,
): Promise<void> {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await client.fetch(USER_WITH_TOKENS_QUERY, { clerkId: userId });
  if (!user) throw new Error("User not found");

  // Find the account to disconnect
  const account = user.connectedAccounts?.find((a) => a._key === accountKey);
  if (!account) throw new Error("Account not found");

  // Revoke the token with Google
  if (account.accessToken) {
    await revokeGoogleToken(account.accessToken);
  }

  // Check if this was the default account
  const wasDefault = account.isDefault;
  const remainingAccounts = user.connectedAccounts?.filter(
    (a) => a._key !== accountKey,
  );

  // Remove the account from Sanity
  await mutateClient
    .patch(user._id)
    .unset([`connectedAccounts[_key=="${accountKey}"]`])
    .commit();

  // If the removed account was the default and there are other accounts,
  // set the first remaining account as default
  if (wasDefault && remainingAccounts && remainingAccounts.length > 0) {
    const newDefaultKey = remainingAccounts[0]._key;
    await mutateClient
      .patch(user._id)
      .set({
        [`connectedAccounts[_key=="${newDefaultKey}"].isDefault`]: true,
      })
      .commit();
  }
}

/**
 * Set a connected account as the default for new bookings
 */
export async function setDefaultCalendarAccount(
  accountKey: string,
): Promise<void> {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await client.fetch(USER_WITH_TOKENS_QUERY, { clerkId: userId });
  if (!user) throw new Error("User not found");

  // Verify the account exists
  const account = user.connectedAccounts?.find((a) => a._key === accountKey);
  if (!account) throw new Error("Account not found");

  // Set all accounts to non-default, then set the target as default
  // We need to do this in two patches to avoid conflicts
  for (const acc of user.connectedAccounts ?? []) {
    if (acc._key !== accountKey && acc.isDefault) {
      await mutateClient
        .patch(user._id)
        .set({
          [`connectedAccounts[_key=="${acc._key}"].isDefault`]: false,
        })
        .commit();
    }
  }

  // Set the target account as default
  await mutateClient
    .patch(user._id)
    .set({
      [`connectedAccounts[_key=="${accountKey}"].isDefault`]: true,
    })
    .commit();
}
