import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';
import { useForm } from 'react-hook-form';
import { useCreateCabin } from './useCreateCabin';
import { useUpdateCabin } from './useUpdateCabin';

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  //
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;
  const { isCreating, createCabin } = useCreateCabin();
  const { isUpdating, updateCabin } = useUpdateCabin();
  const isCruding = isCreating || isUpdating;

  function onSubmit(data) {
    const image = typeof data.image === 'string' ? data.image : data.image[0];

    if (isEditSession)
      updateCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: data => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createCabin(
        { ...data, image },
        {
          onSuccess: data => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? 'modal' : 'regular'}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          disabled={isCruding}
          type="text"
          id="name"
          {...register('name', {
            required: 'This field is required!',
          })}
        />
      </FormRow>
      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          disabled={isCruding}
          type="number"
          id="maxCapacity"
          {...register('maxCapacity', {
            required: 'This field is required!',
            min: { value: 1, message: 'Minimum capacity should be 1!' },
          })}
        />
      </FormRow>
      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input
          disabled={isCruding}
          type="number"
          id="regularPrice"
          {...register('regularPrice', {
            required: 'This field is required!',
            min: { value: 1, message: 'Enter a positive price!' },
          })}
        />
      </FormRow>
      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          disabled={isCruding}
          type="number"
          id="discount"
          defaultValue={0}
          {...register('discount', {
            required: 'This field is required!',
            validate: value =>
              value <= getValues().regularPrice ||
              'Discount should be less than regular price!',
          })}
        />
      </FormRow>
      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          disabled={isCruding}
          type="number"
          id="description"
          defaultValue=""
          {...register('description', {
            required: 'This field is required!',
          })}
        />
      </FormRow>
      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register('image', {
            required: isEditSession ? false : 'This field is required!',
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
        <Button disabled={isCruding}>
          {isEditSession ? 'Edit cabin' : 'Create cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
