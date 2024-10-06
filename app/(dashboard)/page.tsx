import { Button } from '@/components/ui/button';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { File, PlusCircle } from 'lucide-react';
// import { Button } from '@/components/ui/button';
import { ProductsTable } from '../backup/products-table';
import { getPatients } from '@/lib/db';
import { PatientManagement } from './PatientManagement';

export default async function ProductsPage({
  searchParams
}: {
  searchParams: { q: string; offset: string };
}) {
  const search = searchParams.q ?? '';
  const offset = searchParams.offset ?? 0;
  const { patients, newOffset, totalProducts } = await getPatients(
    search,
    Number(offset)
  );

  console.log('patients', patients);

  return (
    <Tabs defaultValue="all">
      <PatientManagement iPatients={patients} />
    </Tabs>
  );
}
