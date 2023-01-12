import { APIResponse, FetchCall } from "../models";

interface ItemInfo {
  name: string;
  category: string;
  note?: string;
  image?: string;
}

export default function addItemToItemsList({
  name,
  category,
  note,
  image,
}: ItemInfo): FetchCall<APIResponse<undefined>> {
  const controller = new AbortController();

  return {
    call: fetch("/api/items-list/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, category, note, image }),
      signal: controller.signal,
    }).then(res => res.json()),
    controller,
  };
}
