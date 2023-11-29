import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";
import {HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineCalendarDays} from 'react-icons/hi2'

export default function Stats({bookings, confirmedStays, cabinCount, numDays}) {



    const numBookings = bookings.length

    const sales = bookings.reduce((acc, cur) => acc+cur.totalPrice, 0)

    const checkings = confirmedStays.length

    const occupations = confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) / (numDays * cabinCount)

  return (
    <>
    <Stat title="Bookings" color="blue" icon={<HiOutlineBriefcase />} value={numBookings}/>
    <Stat title="Sales" color="green" icon={<HiOutlineBanknotes />} value={formatCurrency(sales)}/>
    <Stat title="Check ins" color="indigo" icon={<HiOutlineCalendarDays />} value={checkings}/>
    <Stat title="Bookings" color="yellow" icon={<HiOutlineBriefcase />} value={Math.round(occupations * 100) + "%"}/>
    </>
  )
}
