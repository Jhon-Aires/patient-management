'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import { Patient } from '@/types/Patients';
import PatientCard from '@/components/dashboard/PatientCard';
import AddOrEditDialog from '@/components/dashboard/AddOrEditDialog';

export function PatientManagement({ iPatients }: { iPatients: any[] }) {
  const [patients, setPatients] = useState<Patient[]>(iPatients);
  const [expandedPatient, setExpandedPatient] = useState<number | null>(null);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [isAddingPatient, setIsAddingPatient] = useState(false);

  console.log('iPatients', iPatients);

  const handleExpand = (id: number) => {
    setExpandedPatient(expandedPatient === id ? null : id);
  };

  const handleEdit = (patient: Patient) => {
    setEditingPatient(patient);
  };

  const handleAdd = () => {
    setIsAddingPatient(true);
    setEditingPatient({
      id: 1,
      name: '',
      description: '',
      createdAt: '',
      website: '',
      avatar: ''
    });
    // , age: 0, condition: ''
  };

  const handleSave = (patient: Patient) => {
    if (
      !patient.name
      // || patient.age <= 0 || !patient.condition
    ) {
      toast.error('Please fill in all fields correctly');
      return;
    }

    if (isAddingPatient) {
      setPatients([...patients, patient]);
      toast.success('Patient added successfully');
    } else {
      setPatients(patients.map((p) => (p.id === patient.id ? patient : p)));
      toast.success('Patient updated successfully');
    }
    setEditingPatient(null);
    setIsAddingPatient(false);
  };

  const handleDelete = (id: number) => {
    setPatients(patients.filter((p) => p.id !== id));
    toast.success('Patient deleted successfully');
  };

  return (
    <div className="container mx-auto p-4">
      <Toaster />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Patient Management</h1>
        <Button onClick={handleAdd} className="mb-4">
          <Plus className="mr-2 h-4 w-4" /> Add Patient
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {patients.map((patient) => (
          <PatientCard
            key={patient.id}
            patient={patient}
            expanded={expandedPatient === patient.id}
            onExpand={handleExpand}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
      <AddOrEditDialog
        editingPatient={editingPatient}
        handleSave={handleSave}
        setEditingPatient={setEditingPatient}
        isAddingPatient={isAddingPatient}
      />
    </div>
  );
}
