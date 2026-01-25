// Revoke Google OAuth token
export async function revokeGoogleToken(accessToken: string) {
  try {
    await fetch(`https://oauth2.googleapis.com/revoke?token=${accessToken}`, {
      method: "POST",
    });
  } catch (error) {
    console.error("Failed to revoke token:", error);
    // Continue anyway - the token will expire eventually
  }
}
