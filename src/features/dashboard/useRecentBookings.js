import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";
export function useRecentBookings() {
  const [searchParams] = useSearchParams();

  const numStays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));
  const queryDate = subDays(new Date(), numStays).toISOString();
  const { data: bookingsData, isLoading } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ["bookings", `last-${numStays}`],
  });

  return { bookingsData, isLoading, numStays };
}
