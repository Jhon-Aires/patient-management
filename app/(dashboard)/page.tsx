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
  const patients = await getPatients();

  return (
    <Tabs defaultValue="all">
      <PatientManagement initialPatients={patients} />
    </Tabs>
  );
}
