import { useSession } from "next-auth/react";

export default function useSuperfetch(
  url: string,
  //disable ts suggestion for headers since we are setting them up manually
  options?: Omit<RequestInit, "headers">
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
