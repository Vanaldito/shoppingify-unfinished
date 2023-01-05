import verifyAuthToken from "./verifyAuthToken";

export default function getUserIdFromCookie(authTokenCookie: string) {
  const authToken = authTokenCookie.split(" ")[1];

  if (!authToken) {
    return null;
  }

  let userId: null | number;
  try {
    userId = (verifyAuthToken(authToken) as { userId: number }).userId;
  } catch {
    userId = null;
  }

  return userId;
}
