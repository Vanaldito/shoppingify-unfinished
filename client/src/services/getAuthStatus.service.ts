import { APIResponse, FetchCall } from "../models";

export default function getAuthStatus(): FetchCall<
  APIResponse<{ authenticated: boolean }>
> {
  const controller = new AbortController();

  return {
    call: fetch("/api/auth-status", { signal: controller.signal }).then(res =>
      res.json()
    ),
    controller,
  };
}
