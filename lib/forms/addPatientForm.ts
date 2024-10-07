import { z } from 'zod';

import { Input } from '@/components/ui/input';
import { formField } from '@/types/Forms';
import {
  formFields as editPatientFormFields,
  schema as editPatientFormSchema,
  initialValues as editPatientFormInitialValues
} from './editPatientForm';

export const formFields: formField[] = [
  {
    name: 'id',
    label: 'ID',
    controller: Input,
    controllerAttrs: {
      placeholder: '12345678'
    }
  },
  ...editPatientFormFields
];

export const initialValues: typeof editPatientFormInitialValues & {
  id: number | undefined;
} = {
  ...editPatientFormInitialValues,
  id: undefined
};

export const schema = z
  .object({
    id: z.coerce
      .number({
        message: 'ID must be a number'
      })
      .min(1, 'ID is required')
  })
  .merge(editPatientFormSchema);
