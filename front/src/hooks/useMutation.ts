import { useEffect, useState } from "react";
import client from "@/configs/axiosRequest.ts";
import { AxiosError, AxiosResponse } from "axios";
import { HttpMethod } from "@/types";
import { fireToast } from "@/utils/Toast.tsx";
import { toast } from "sonner";

interface MutationOptions {
  url: string;
  method?: HttpMethod;
  body: unknown;
}

export default function useMutation<T>() {
  /* ---------- hook ---------- */
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>();

  /* ---------- handler ---------- */
  const handleSuccess = async (options: MutationOptions): Promise<void> => {
    const res: AxiosResponse<T> = await client[options.method ?? "post"]<T>(
      options.url,
      options.body,
    );
    setData(res.data);
  };

  const handleError = (error: unknown) => {
    if (error instanceof AxiosError) {
      setError(error?.response?.data?.error?.message);
      fireToast("error", error?.response?.data?.error?.message);
    } else {
      setError("Unknown error");
      fireToast("error", "Unknown error");
    }
  };

  const runMutate = (options: MutationOptions) => {
    setLoading(true);
    handleSuccess(options)
      .catch((error: unknown) => {
        handleError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  /* ---------- life cycle ---------- */
  useEffect(() => {
    if (loading) {
      fireToast("loading", "please wait...", {
        id: `loading`,
      });
    } else {
      toast.dismiss("loading");
    }
  }, [loading]);

  return { data, loading, error, execute: runMutate };
}
