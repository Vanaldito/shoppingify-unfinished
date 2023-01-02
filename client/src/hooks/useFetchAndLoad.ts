import { useEffect, useState } from "react";
import { FetchCall } from "../models";

export default function useFetchAndLoad() {
  const [loading, setLoading] = useState(false);
  const [controller, setController] = useState<null | AbortController>(null);

  async function callEndpoint<T>(fetchCall: FetchCall<T>) {
    const { call, controller } = fetchCall;

    setController(controller);
    setLoading(true);

    let data: T;
    try {
      data = await call;
    } catch (err) {
      setController(null);
      setLoading(false);

      throw err;
    }

    setController(null);
    setLoading(false);

    return data;
  }

  useEffect(() => {
    return () => {
      controller?.abort();
      setLoading(false);
    };
  }, []);

  return { loading, callEndpoint };
}
