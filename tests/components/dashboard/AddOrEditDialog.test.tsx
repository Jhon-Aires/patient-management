import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import AddPatientForm from '@/components/dashboard/AddPatientForm';
import AddOrEditDialog from '@/components/dashboard/AddOrEditDialog';

jest.mock('@/components/dashboard/AddPatientForm');
jest.mock('@/components/dashboard/EditPatientForm');

describe('AddOrEditDialog', () => {
  const editingPatient = {
    avatar: 'patient avatar',
    createdAt: '',
    description: 'description',
    id: 1,
    name: 'Patient Name',
    website: ''
  };

  const onCancel = jest.fn();
  const onSave = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const { asFragment } = render(
      <AddOrEditDialog
        editingPatient={editingPatient}
        handleCancel={onCancel}
        handleSave={onSave}
        isAddingPatient={false}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should show the EditPatientForm when editing a patient', () => {
    render(
      <AddOrEditDialog
        editingPatient={editingPatient}
        handleCancel={onCancel}
        handleSave={onSave}
        isAddingPatient={false}
      />
    );

    expect(screen.getByText(/editpatientform/i)).toBeInTheDocument();
  });

  it('should show the AddPatientForm when adding a patient', () => {
    render(
      <AddOrEditDialog
        editingPatient={editingPatient}
        handleCancel={onCancel}
        handleSave={onSave}
        isAddingPatient={true}
      />
    );

    expect(screen.getByText(/addpatientform/i)).toBeInTheDocument();
  });
});
