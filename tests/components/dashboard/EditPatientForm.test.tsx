import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import EditPatientForm from '@/components/dashboard/EditPatientForm';

describe('EditPatientForm', () => {
  const patient = {
    avatar: '',
    createdAt: '',
    description: 'description',
    id: 1,
    name: 'Patient Name',
    website: ''
  };

  const onSave = jest.fn();
  const onClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const { asFragment } = render(
      <EditPatientForm patient={patient} onSave={onSave} onCancel={onClose} />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should call onSave when the form is submitted', async () => {
    render(
      <EditPatientForm patient={patient} onSave={onSave} onCancel={onClose} />
    );

    const submitButton = screen.getByRole('button', { name: /save/i });

    await userEvent.click(submitButton);

    expect(onSave).toHaveBeenCalledWith(patient);
  });

  it('should call onCancel when the cancel button is clicked', async () => {
    render(
      <EditPatientForm patient={patient} onSave={onSave} onCancel={onClose} />
    );

    const cancelButton = screen.getByRole('button', { name: /cancel/i });

    await userEvent.click(cancelButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should update the form values when the user types', async () => {
    render(
      <EditPatientForm patient={patient} onSave={onSave} onCancel={onClose} />
    );

    const nameInput = screen.getByRole('textbox', {
      name: /name/i
    });

    const descriptionInput = screen.getByRole('textbox', {
      name: /description/i
    });

    const avatarInput = screen.getByRole('textbox', {
      name: /avatar/i
    });

    expect(nameInput).toHaveValue(patient.name);
    expect(descriptionInput).toHaveValue(patient.description);
    expect(avatarInput).toHaveValue(patient.avatar);

    const newPatientData = {
      ...patient,
      name: 'New Patient Name',
      description: 'New Patient Description',
      avatar: 'New Patient Avatar'
    };

    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, newPatientData.name);

    await userEvent.clear(descriptionInput);
    await userEvent.type(descriptionInput, newPatientData.description);

    await userEvent.clear(avatarInput);
    await userEvent.type(avatarInput, newPatientData.avatar);

    expect(nameInput).toHaveValue(newPatientData.name);
    expect(descriptionInput).toHaveValue(newPatientData.description);
    expect(avatarInput).toHaveValue(newPatientData.avatar);

    const submitButton = screen.getByRole('button', {
      name: /save/i
    });

    await userEvent.click(submitButton);

    expect(onSave).toHaveBeenCalledWith(newPatientData);
  });

  it('should show input errors when the form is submitted with invalid data', async () => {
    render(
      <EditPatientForm patient={patient} onSave={onSave} onCancel={onClose} />
    );

    const submitButton = screen.getByRole('button', { name: /save/i });

    const nameInput = screen.getByRole('textbox', {
      name: /name/i
    });

    await userEvent.clear(nameInput);

    await userEvent.click(submitButton);

    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
  });

  it('should not call onSave when the form is submitted with invalid data', async () => {
    render(
      <EditPatientForm patient={patient} onSave={onSave} onCancel={onClose} />
    );

    const submitButton = screen.getByRole('button', { name: /save/i });

    const nameInput = screen.getByRole('textbox', {
      name: /name/i
    });

    await userEvent.clear(nameInput);

    await userEvent.click(submitButton);

    expect(onSave).not.toHaveBeenCalled();
  });
});
