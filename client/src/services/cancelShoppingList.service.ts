import { APIResponse, FetchCall } from "../models";

export default function cancelShoppingList(
  state: "cancelled" | "completed"
): FetchCall<APIResponse<{ newListName: string }>> {
  const controller = new AbortController();

  return {
    call: fetch("/api/shopping-list/cancel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ state }),
      signal: controller.signal,
    }).then(res => res.json()),
    controller,
  };
}
