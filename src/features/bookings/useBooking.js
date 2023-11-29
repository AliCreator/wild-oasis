import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";

export function useBooking() {
  const { bookingId } = useParams();

  const {
    data: booking,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getBooking(bookingId),
    queryKey: ["booking", bookingId],
    retry: false,
  });

  return { booking, isLoading, error };
}
