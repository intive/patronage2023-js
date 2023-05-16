import { useSession } from "next-auth/react";

interface SuperOptions extends Omit<Omit<RequestInit, "headers">, "body"> {
  body: object;
}

export default function useSuperfetch(
  url: string,
  //disable ts suggestion for headers since we are setting them up manually and allow body to be object
  options?: SuperOptions
) {
  const { data: session } = useSession();

  const superfetch = () => {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      accept: "*/*",
      Authorization: "Bearer " + session?.user.accessToken,
    };

    return fetch(url, {
      ...options,
      body: JSON.stringify(options?.body),
      headers,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .catch((error) => {
        throw new Error(`${error}`);
      });
  };

  return superfetch;
}
