import { Tabs } from '@/components/ui/tabs';
import { getPatients } from '@/lib/services/db';
import { PatientManagement } from './PatientManagement';

export default async function ProductsPage({
  searchParams
}: {
  searchParams: { q: string; offset: string };
}) {
  const patients = await getPatients();

  return (
    <Tabs defaultValue="all">
      <PatientManagement initialPatients={patients} />
    </Tabs>
  );
}
