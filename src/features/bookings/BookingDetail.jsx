import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDelete } from "../check-in-out/useDelete";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, error, isLoading } = useBooking();
  const navigate = useNavigate();

  const { checkout, isCheckoutLoading } = useCheckout();
  const { deleteBookingFn, isDeleting } = useDelete();

  const status = booking?.status;

  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (isLoading) return <Spinner />;

  if(!booking) return <Empty resource="booking"/>
  return (
    <>
      <Modal>
        <Row type="horizontal">
          <HeadingGroup>
            <Heading as="h1">Booking #{booking.id}</Heading>
            <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
          </HeadingGroup>
          <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
        </Row>

        <BookingDataBox booking={booking} />

        <ButtonGroup>
          <Modal.Open opens="delete-cabin">
            <Button
              variation="danger"
              onClick={() => deleteBookingFn(booking.id)}
              disabled={isDeleting}
            >
              Delete
            </Button>
          </Modal.Open>

          {booking.status === "unconfirmed" && (
            <Button onClick={() => navigate(`/checkin/${booking.id}`)}>
              Check in
            </Button>
          )}

          {booking.status === "checked-in" && (
            <Button
              onClick={() => checkout(booking.id)}
              disabled={isCheckoutLoading}
            >
              Check out
            </Button>
          )}
          <Button variation="secondary" onClick={moveBack}>
            Back
          </Button>
        </ButtonGroup>
        <Modal.Window name="delete-cabin">
          <ConfirmDelete
            resource={`${booking.id} booking`}
            onConfirm={() => deleteBookingFn(booking.id)}
            disabled={isDeleting}
          />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default BookingDetail;
