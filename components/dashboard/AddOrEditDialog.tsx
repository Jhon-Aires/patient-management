import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import EditPatientForm from '@/components/dashboard/EditPatientForm';
import { Patient } from '@/types/Patients';
import AddPatientForm from './AddPatientForm';

export default function AddOrEditDialog({
  editingPatient,
  handleCancel,
  handleSave,
  isAddingPatient
}: {
  editingPatient: Patient | null;
  handleCancel: () => void;
  handleSave: (patient: Patient) => void;
  isAddingPatient: boolean;
}) {
  return (
    <Dialog open={editingPatient !== null} onOpenChange={handleCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isAddingPatient ? 'Add Patient' : 'Edit Patient'}
          </DialogTitle>
          <DialogDescription>
            {isAddingPatient
              ? 'Add a new patient to the system.'
              : 'Make changes to patient information here.'}
          </DialogDescription>
        </DialogHeader>
        {editingPatient && !isAddingPatient && (
          <EditPatientForm
            patient={editingPatient}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        )}
        {editingPatient && isAddingPatient && (
          <AddPatientForm onSave={handleSave} onCancel={handleCancel} />
        )}
      </DialogContent>
    </Dialog>
  );
}
