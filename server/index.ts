import cookieParser from "cookie-parser";
import express from "express";
import path from "path";
import { protectRoute } from "./src/middleware";
import { apiRouter } from "./src/routes";

async function main() {
  const app = express();

  if (process.env.VEREX_ENV === "production") {
    app.use("/", express.static(path.join(__dirname, "static")));
  }

  app.use(express.json());
  app.use(cookieParser());
  app.use("/api", apiRouter);

  app.get("/", protectRoute, (_req, res) => {
    res.sendFile(path.join(__dirname, process.env.VEREX_HTML_PATH as string));
  });

  app.get("/history", protectRoute, (_req, res) => {
    res.sendFile(path.join(__dirname, process.env.VEREX_HTML_PATH as string));
  });

  app.get("/sign-up", (_req, res) => {
    res.sendFile(path.join(__dirname, process.env.VEREX_HTML_PATH as string));
  });

  app.get("/login", (_req, res) => {
    res.sendFile(path.join(__dirname, process.env.VEREX_HTML_PATH as string));
  });

  /* Add your routes here */

  if (process.env.VEREX_ENV === "development") {
    const { Assets } = await import("verex");
    new Assets().useRouter(app);
  }

  app.get("/*", (_req, res) => {
    res
      .status(404)
      .sendFile(path.join(__dirname, process.env.VEREX_HTML_PATH as string));
  });

  const PORT = 5000;

  app.listen(PORT, () => {
    console.log();
    console.log(`  App running in port ${PORT}`);
    console.log();
    console.log(`  > Local: \x1b[36mhttp://localhost:\x1b[1m${PORT}/\x1b[0m`);
  });
}

main();
