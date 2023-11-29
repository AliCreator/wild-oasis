import { useForm } from "react-hook-form";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;

  const isEditing = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditing ? editValues : {},
  });

  const { errors } = formState;
  const { isCreating, createCabin } = useCreateCabin();
  const { editCabin, isEditingSession } = useEditCabin();

  const isWorking = isCreating || isEditingSession;

  const onSubmitForm = (data) => {
    const imageName =
      typeof data.image === "string" ? data.image : data.image[0];

    if (isEditing) {
      editCabin(
        { newCabin: { ...data, image: imageName }, cabinId: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.()
          },
        }
      );
    } else {
      createCabin(
        { ...data, image: imageName },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  };

  const onError = (err) => {
    console.log(err);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmitForm, onError)} type={onCloseModal ? "modal" : "regular"}>
      <FormRow label="Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required:
              "Name field is mandatory. Please provide a name for the cabin!",
          })}
        />
      </FormRow>

      <FormRow label="Max Capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "Please provide the maximum capacity for the cabin!",
            min: {
              value: 1,
              message: "Minimum capacity is 1",
            },
            max: {
              value: 12,
              message: "Maximum capacity is 12",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "Please provide a value for regulare price!",
            min: {
              value: 100,
              message: "The minimum price is 100",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" errors={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "Please provide a value for discount. You can add 0!",
            validate: (value) =>
              getValues().regularPrice >= value ||
              "Discount can not be greater than regular price!",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "Please provide a description for the cabin!",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditing ? false : "Please upload photo of the cabin!",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditing ? "Edit Cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
