import { useQuery } from "@tanstack/react-query";

export const useFetchData = <T>(
  url: string,
  queryKey: string,
  params?: Record<string, string | number>
) => {
  const queryString = params
    ? "?" + new URLSearchParams(params as Record<string, string>).toString()
    : "";

  return useQuery<T>({
    queryKey: [queryKey, params], // Include params in the query key for caching
    queryFn: async () => {
      const res = await fetch(`${url}${queryString}`);
      if (!res.ok) throw new Error("Failed to fetch data");
      return res.json();
    },
  });
};
