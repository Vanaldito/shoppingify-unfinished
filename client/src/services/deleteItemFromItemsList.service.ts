import { APIResponse, FetchCall } from "../models";

interface ItemInfo {
  category: string;
  name: string;
}

export default function deleteItemFromItemsList({
  category,
  name,
}: ItemInfo): FetchCall<APIResponse<undefined>> {
  const controller = new AbortController();

  return {
    call: fetch("/api/items-list/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, category }),
      signal: controller.signal,
    }),
    controller,
  };
}
