import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import PatientForm from '@/components/dashboard/PatientForm';
import { Patient } from '@/types/Patients';

export default function AddOrEditDialog({
  editingPatient,
  setEditingPatient,
  handleSave,
  isAddingPatient
}: {
  editingPatient: Patient | null;
  setEditingPatient: (patient: Patient | null) => void;
  handleSave: (patient: Patient) => void;
  isAddingPatient: boolean;
}) {
  return (
    <Dialog
      open={editingPatient !== null}
      onOpenChange={() => setEditingPatient(null)}
    >
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
        {editingPatient && (
          <PatientForm
            patient={editingPatient}
            onSave={handleSave}
            onCancel={() => setEditingPatient(null)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
