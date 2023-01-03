import jwt from "jsonwebtoken";
import processEnv from "../../environment";

export default function verifyAuthToken(authToken: string) {
  return jwt.verify(authToken, processEnv.JWT_SECRET as string);
}
