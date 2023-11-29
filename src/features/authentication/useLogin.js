import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../services/authApi";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),
    onSuccess: (user) => {
      toast.success("Authentication successful. Routing to main page!");
      queryClient.setQueryData(["user"], user.user);
      navigate("/", { replace: true });
    },
    onError: (err) => toast.error(err.message),
  });

  return { mutate, isLoading };
}
