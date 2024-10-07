'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { formFields, initialValues, schema } from '@/lib/forms/addPatientForm';
import { Patient } from '@/types/Patients';

export default function AddPatientForm({
  onSave,
  onCancel
}: {
  onSave: (patient: Patient) => void;
  onCancel: () => void;
}) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { ...initialValues },
    reValidateMode: 'onSubmit'
  });

  const onSubmit: SubmitHandler<typeof initialValues> = ({
    avatar,
    description,
    name,
    id
  }) => {
    onSave({
      avatar,
      description,
      name,
      id: Number(id),
      createdAt: new Date().toISOString(),
      website: ''
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {formFields.map(
          ({
            controller: Controller,
            controllerAttrs,
            label,
            name,
            description
          }) => {
            return (
              <FormField
                key={name}
                control={form.control}
                name={name as keyof typeof initialValues}
                render={({ field }) => (
                  <FormItem>
                    {label && <FormLabel>{label}</FormLabel>}
                    <FormControl>
                      <Controller
                        {...field}
                        {...controllerAttrs}
                        className={controllerAttrs?.className}
                      />
                    </FormControl>
                    {description && (
                      <FormDescription>{description}</FormDescription>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          }
        )}
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Add</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
