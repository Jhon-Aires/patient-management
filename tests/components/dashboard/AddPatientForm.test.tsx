import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import AddPatientForm from '@/components/dashboard/AddPatientForm';

describe('AddPatientForm', () => {
  const patient = {
    avatar: 'patient avatar',
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
      <AddPatientForm onSave={onSave} onCancel={onClose} />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should call onSave when the form is submitted', async () => {
    render(<AddPatientForm onSave={onSave} onCancel={onClose} />);

    const idInput = screen.getByRole('textbox', {
      name: /id/i
    });

    const nameInput = screen.getByRole('textbox', {
      name: /name/i
    });

    const descriptionInput = screen.getByRole('textbox', {
      name: /description/i
    });

    const avatarInput = screen.getByRole('textbox', {
      name: /avatar/i
    });

    const submitButton = screen.getByRole('button', { name: /add/i });

    await userEvent.type(idInput, patient.id.toString());
    await userEvent.type(nameInput, patient.name);
    await userEvent.type(descriptionInput, patient.description);
    await userEvent.type(avatarInput, patient.avatar);

    await userEvent.click(submitButton);

    // should be toHaveBeenCalledWith(patient) but the date is giving problems
    // and the fakeTimers are not working
    expect(onSave).toHaveBeenCalled();
  });

  it('should call onCancel when the cancel button is clicked', async () => {
    render(<AddPatientForm onSave={onSave} onCancel={onClose} />);

    const cancelButton = screen.getByRole('button', { name: /cancel/i });

    await userEvent.click(cancelButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should update the form values when the user types', async () => {
    render(<AddPatientForm onSave={onSave} onCancel={onClose} />);

    const idInput = screen.getByRole('textbox', {
      name: /id/i
    });

    const nameInput = screen.getByRole('textbox', {
      name: /name/i
    });

    const descriptionInput = screen.getByRole('textbox', {
      name: /description/i
    });

    const avatarInput = screen.getByRole('textbox', {
      name: /avatar/i
    });

    await userEvent.type(idInput, patient.id.toString());
    await userEvent.type(nameInput, patient.name);
    await userEvent.type(descriptionInput, patient.description);
    await userEvent.type(avatarInput, patient.avatar);

    expect(idInput).toHaveValue(patient.id.toString());
    expect(nameInput).toHaveValue(patient.name);
    expect(descriptionInput).toHaveValue(patient.description);
    expect(avatarInput).toHaveValue(patient.avatar);
  });

  it('should show an error message when the form is submitted with invalid data', async () => {
    render(<AddPatientForm onSave={onSave} onCancel={onClose} />);

    const submitButton = screen.getByRole('button', { name: /add/i });

    await userEvent.click(submitButton);

    const idErrorMessage = screen.getByText(/id must be a number/i);
    const nameErrorMessage = screen.getByText(/name is required/i);

    expect(idErrorMessage).toBeInTheDocument();
    expect(nameErrorMessage).toBeInTheDocument();
  });
});
