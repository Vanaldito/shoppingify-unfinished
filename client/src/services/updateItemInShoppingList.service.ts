import { APIResponse, FetchCall } from "../models";

export default function updateItemInShoppingList(
  category: string,
  name: string,
  amount: number
): FetchCall<APIResponse<undefined>> {
  const controller = new AbortController();

  return {
    call: fetch("/api/shopping-list/update", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ category, name, amount }),
      signal: controller.signal,
    }).then(res => res.json()),
    controller,
  };
}
