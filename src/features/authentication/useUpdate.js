import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/authApi";
import { toast } from "react-hot-toast";

export function useUpdate() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading: isEditing } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: () => {
      toast.success("Your account has been updated!"),
        queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateUser, isEditing };
}
