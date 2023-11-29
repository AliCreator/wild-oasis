import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useDelete() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: deleteBookingFn, isLoading: isDeleting } = useMutation({
    mutationFn: (bookingId) => deleteBooking(bookingId),
    onSuccess: () => {
      toast.success("Booking has been deleted!");
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: () =>
      toast.error("There was a problem while deleting the booking!"),
  });
  return { deleteBookingFn, isDeleting };
}
