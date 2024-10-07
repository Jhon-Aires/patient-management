import { Patient } from '@/types/Patients';
import 'server-only';

export async function getPatients(): Promise<Patient[]> {
  const response = await fetch(
    'https://63bedcf7f5cfc0949b634fc8.mockapi.io/users'
  );

  // if (offset === null) {
  //   return { products: [], newOffset: null, totalProducts: 0 };
  // }

  const patients = (await response.json()) as Patient[];

  return patients;
}
