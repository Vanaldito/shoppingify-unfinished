import { APIResponse, FetchCall } from "../models";

export default function changeShoppingListName(
  name: string
): FetchCall<APIResponse<undefined>> {
  const controller = new AbortController();

  return {
    call: fetch("/api/shopping-list/name", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ name }),
      signal: controller.signal,
    }).then(res => res.json()),
    controller,
  };
}
