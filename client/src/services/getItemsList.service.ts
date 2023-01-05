import { APIResponse, FetchCall, ItemsList } from "../models";

export default function getItemsList(): FetchCall<
  APIResponse<{ itemsList: ItemsList }>
> {
  const controller = new AbortController();

  return {
    call: fetch("/api/items-list", {
      signal: controller.signal,
    }).then(res => res.json()),
    controller,
  };
}
