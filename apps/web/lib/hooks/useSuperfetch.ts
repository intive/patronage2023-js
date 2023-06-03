import dictionary from "lib/dictionary";
import { useSession } from "next-auth/react";
import { useToast } from "ui";
import { useTranslate } from "./useTranslate";

interface SuperOptions extends Omit<RequestInit, "headers" | "body"> {
  body?: object;
}

class SuperError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export default function useSuperfetch() {
  const { data: session } = useSession();
  const showToast = useToast();
  const { t, dict } = useTranslate("Errors");

  const superfetch = (
    url: string,
    //disable ts suggestion for headers since we are setting them up manually and allow body to be object
    options?: SuperOptions
  ) => {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      accept: "application/json",
      Authorization: "Bearer " + session?.user.accessToken,
    };

    return fetch(url, {
      ...options,
      body: JSON.stringify(options?.body),
      headers,
    })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json().catch(() => ({}));
          return { ...data, httpStatus: res.status };
        } else if (res.status === 400) {
          showToast({
            variant: "error",
            message: t(dict["1.1"]),
          });
        }

        // throw new SuperError("An error has occurred.", res.status);
      })

      .catch(() => {
        throw new SuperError("Something went wrong", 500);
      });
  };

  return superfetch;
}
