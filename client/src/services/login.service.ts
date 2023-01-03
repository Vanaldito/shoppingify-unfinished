import { APIResponse, FetchCall } from "../models";

interface UserInfo {
  email: string;
  password: string;
}

export default function login(
  userInfo: UserInfo
): FetchCall<APIResponse<undefined>> {
  const controller = new AbortController();

  return {
    call: fetch("/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
      signal: controller.signal,
    }).then(res => res.json()),
    controller,
  };
}
