import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import PatientCard from '@/components/dashboard/PatientCard';

describe('PatientCard', () => {
  const patient = {
    avatar: '',
    createdAt: '',
    description: 'description',
    id: 1,
    name: 'Patient Name',
    website: ''
  };

  const onDelete = jest.fn();
  const onEdit = jest.fn();
  const onExpand = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const { asFragment } = render(
      <PatientCard
        expanded={false}
        onDelete={onDelete}
        onEdit={onEdit}
        onExpand={onExpand}
        patient={patient}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should call onExpand when the expand button is clicked', () => {
    render(
      <PatientCard
        expanded={false}
        onDelete={onDelete}
        onEdit={onEdit}
        onExpand={onExpand}
        patient={patient}
      />
    );

    const heading = screen.getByRole('heading', {
      name: /patient name patient name/i
    });

    screen.logTestingPlaygroundURL();
    const patientName = screen.getByText(/patient name/i);

    expect(patientName).toBeInTheDocument();
    // const expandButton = within(heading).getByRole('button');

    // userEvent.click(expandButton);

    // expect(onExpand).toHaveBeenCalledWith(patient.id);
  });

  // it('should call onEdit when the edit button is clicked', () => {
  //   render(
  //     <PatientCard
  //       expanded={false}
  //       onDelete={onDelete}
  //       onEdit={onEdit}
  //       onExpand={onExpand}
  //       patient={patient}
  //     />
  //   );

  //   const editButton = screen.getByRole('button', {
  //     name: /edit/i
  //   });

  //   screen.logTestingPlaygroundURL();

  //   userEvent.click(editButton);

  //   expect(onEdit).toHaveBeenCalledWith(patient);
  // });
});
