import 'server-only';

import { Patient } from '@/types/Patients';

export async function getPatients(): Promise<Patient[]> {
  const response = await fetch(
    'https://63bedcf7f5cfc0949b634fc8.mockapi.io/users'
  );

  const patients = (await response.json()) as Patient[];

  return patients;
}
