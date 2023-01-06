import { APIResponse, FetchCall } from "../models";

interface ItemInfo {
  name: string;
  category: string;
}

export default function addItemToItemsList({
  name,
  category,
}: ItemInfo): FetchCall<APIResponse<undefined>> {
  const controller = new AbortController();

  return {
    call: fetch("/api/items-list/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ item: { name, category } }),
      signal: controller.signal,
    }).then(res => res.json()),
    controller,
  };
}
