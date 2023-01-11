import { APIResponse, FetchCall, ShoppingList } from "../models";

export default function getShoppingList(): FetchCall<
  APIResponse<{ shoppingList: ShoppingList }>
> {
  const controller = new AbortController();

  return {
    call: fetch("/api/shopping-list", {
      signal: controller.signal,
    }).then(res => res.json()),
    controller,
  };
}
