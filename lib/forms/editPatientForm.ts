import { z } from 'zod';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { formField } from '@/types/Forms';
import ImageUpload from '@/components/ui/ImageUpload';

export const formFields: formField[] = [
  {
    name: 'name',
    label: 'Name',
    controller: Input,
    controllerAttrs: {
      placeholder: 'Name'
    }
  },
  {
    name: 'description',
    label: 'Description',
    controller: Textarea,
    controllerAttrs: {
      placeholder: 'Description',
      className: '!max-h-80 !min-h-40'
    }
  },
  {
    name: 'avatar',
    label: 'Avatar',
    // TODO: change to file input
    // controller: ImageUpload
    controller: Input
  }
];

export const initialValues = {
  name: '',
  description: '',
  avatar: ''
};

export const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string(),
  avatar: z.string()
});
