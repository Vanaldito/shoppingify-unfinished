import { APIResponse, FetchCall } from "../models";

interface ItemInfo {
  category: string;
  name: string;
}

export default function deleteItemFromShoppingList({
  category,
  name,
}: ItemInfo): FetchCall<APIResponse<undefined>> {
  const controller = new AbortController();

  return {
    call: fetch("/api/shopping-list/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ category, name }),
      signal: controller.signal,
    }),
    controller,
  };
}
