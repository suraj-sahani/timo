import { defineQuery } from "next-sanity";

/**
 * Get connected accounts for display (without sensitive tokens) - for Sanity Live
 */
export const USER_CONNECTED_ACCOUNTS_DISPLAY_QUERY = defineQuery(`*[
  _type == "user"
  && clerkId == $clerkId
][0]{
  connectedAccounts[]{
    _key,
    accountId,
    email,
    isDefault
  }
}`);
