import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const { checkout, isCheckoutLoading } = useCheckout();
  return (
    <Button
      variation="danger"
      size="small"
      onClick={() => checkout(bookingId)}
      disabled={isCheckoutLoading}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
