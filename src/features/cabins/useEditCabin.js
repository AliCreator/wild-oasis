import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";

export function useEditCabin() {
    const queryClient = useQueryClient();

    const { mutate: editCabin, isLoading: isEditingSession } = useMutation({
      mutationFn: ({ newCabin, cabinId }) => createEditCabin(newCabin, cabinId),
  
      onSuccess: () => {
        toast.success("The cabin has been edited successfully!"),
          queryClient.invalidateQueries({
            queryKey: ["cabins"],
          })
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
    return {editCabin, isEditingSession}
}