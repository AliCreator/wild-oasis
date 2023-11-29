import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();
  const { mutate: checkout, isLoading: isCheckoutLoading } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking ${data.id} has been successfully checked out!`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => toast.error("There was a problem checking out the booking!"),
  });
  return { checkout, isCheckoutLoading };
}
