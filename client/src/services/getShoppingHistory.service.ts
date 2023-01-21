import { APIResponse, FetchCall, ShoppingHistory } from "../models";

export default function getShoppingHistory(): FetchCall<
  APIResponse<{ shoppingHistory: ShoppingHistory }>
> {
  const controller = new AbortController();

  return {
    call: fetch("/api/shopping-history/", {
      headers: { "Content-type": "application/json" },
      signal: controller.signal,
    }),
    controller,
  };
}
