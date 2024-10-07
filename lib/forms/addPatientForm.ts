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
      placeholder: '11111111'
    }
  },
  ...editPatientFormFields
];

export const initialValues = {
  ...editPatientFormInitialValues,
  id: ''
};

export const schema = z
  .object({
    id: z.string().min(1, 'ID is required')
  })
  .merge(editPatientFormSchema);
