import { useMutation, useQueryClient } from "@tanstack/react-query";

export const usePutData = <T>(url: string, queryKey: string) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async ({ id, updatedData }: { id: number; updatedData: T }) => {
        const res = await fetch(`${url}/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        });
        if (!res.ok) throw new Error("Failed to update data");
        return res.json();
      },
      onSuccess: () => {
        if (queryKey) {
            queryClient.invalidateQueries({ queryKey: [queryKey] }); 
          }
      },
    });
  };