import { getPatients } from '@/lib/services/patients';

import { PatientManagement } from './PatientManagement';

export default async function PatientsPage() {
  const patients = await getPatients();

  return <PatientManagement initialPatients={patients} />;
}
