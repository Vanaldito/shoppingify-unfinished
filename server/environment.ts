import { config } from "dotenv";
import path from "path";

config({ path: path.join(__dirname, ".env.local") });

const processEnv = process.env;

export default processEnv;
