import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/authApi";
import { toast } from "react-hot-toast";
export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success(
        `The user has been registered! Please check your email!`
      );
    },
    onError: (err) => toast.error(err.message),
  });

  return { signup, isLoading };
}
