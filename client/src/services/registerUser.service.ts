import { APIResponse, FetchCall } from "../models";

interface UserInfo {
  email: string;
  password: string;
}

export default function registerUser(
  userInfo: UserInfo
): FetchCall<APIResponse<undefined>> {
  const controller = new AbortController();

  return {
    call: fetch("/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
      signal: controller.signal,
    }).then(res => res.json()),
    controller,
  };
}
