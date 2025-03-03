import { useMutation, useQueryClient } from "@tanstack/react-query";

export const usePostData = <T, R>(url: string, queryKey?: string) => {
  const queryClient = useQueryClient();

  return useMutation<R, Error, T>({
    mutationFn: async (newData: T) => {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });
      if (!res.ok) throw new Error("Failed to post data");
      return res.json();
    },
    onSuccess: () => {
      if (queryKey) {
        queryClient.invalidateQueries({ queryKey: [queryKey] }); 
      }
    },
  });
};
