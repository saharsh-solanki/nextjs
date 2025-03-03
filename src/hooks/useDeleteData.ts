import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteData = (url: string, queryKey: string) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async (id: number) => {
        const res = await fetch(`${url}/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Failed to delete data");
        return res.json();
      },
      onSuccess: () => {
        if (queryKey) {
            queryClient.invalidateQueries({ queryKey: [queryKey] }); 
          }
      },
    });
  };
