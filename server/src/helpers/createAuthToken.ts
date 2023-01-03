import jwt from "jsonwebtoken";
import processEnv from "../../environment";

export default function createAuthToken(userId: number) {
  // Create auth token using jsonwebtoken
  return jwt.sign({ userId }, processEnv.JWT_SECRET as string);
}
