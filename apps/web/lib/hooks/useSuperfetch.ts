import { useSession } from "next-auth/react";
import { useToast } from "ui";
import { useTranslate } from "./useTranslate";
import { dictionaryType } from "lib/dictionary";

export interface SuperOptions extends Omit<RequestInit, "headers" | "body"> {
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
        const data = await res.json().catch(() => ({}));
        const errorCode = data.ErrorCode;
        if (res.ok) {
          return { ...data, httpStatus: res.status };
        } else if (res.status === 400) {
          showToast({
            variant: "error",
            message: `${t(dict.title)} ${errorCode}: ${t(
              dict[errorCode as keyof dictionaryType["Errors"]]
            )}`,
          });
        } else if (res.status === 400 && data.ErrorCode === "") {
          showToast({
            variant: "error",
            message: t(dict.noErrorCode),
          });
        } else if (res.status === 401) {
          // brak autoryzacji
        } else if (res.status === 403) {
          console.log(t(dict.status403));
        } else if (res.status === 404) {
          console.log(t(dict.status404));
        } else if (res.status === 500) {
          console.log(t(dict.status500));
        } else {
          showToast({
            variant: "error",
            message: t(dict.defaultError),
          });
        }
      })

      .catch(() => {
        throw new SuperError("Something went wrong", 500);
      });
  };

  return superfetch;
}
