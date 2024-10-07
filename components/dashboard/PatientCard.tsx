'use client';

import { useMemo } from 'react';
import { ChevronDown, ChevronUp, Edit, X } from 'lucide-react';

import { Patient } from '@/types/Patients';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

const backupPatientAvatar = '/placeholder-user.jpg';

export default function PatientCard({
  patient,
  expanded,
  onExpand,
  onEdit,
  onDelete
}: {
  patient: Patient;
  expanded: boolean;
  onExpand: (id: number) => void;
  onEdit: (patient: Patient) => void;
  onDelete: (id: number) => void;
}) {
  const avatar = useMemo(() => {
    if (!patient.avatar) {
      return backupPatientAvatar;
    }

    // cloudflare-ipfs.com doesn't work, so I'm using ipfs.io instead
    if (patient.avatar.includes('cloudflare-ipfs.com')) {
      return patient.avatar.replace('cloudflare-ipfs.com', 'ipfs.io');
    }

    return patient.avatar;
  }, [patient.avatar]);

  return (
    <Card className="max-h-fit w-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img
              src={avatar}
              alt={patient.name}
              className="h-10 w-10 rounded-full object-cover"
            />
            {patient.name}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onExpand(patient.id)}
          >
            {expanded ? <ChevronUp /> : <ChevronDown />}
          </Button>
        </CardTitle>
        {/* <CardDescription>Age: {patient.age}</CardDescription> */}
      </CardHeader>
      <CardContent
        className={cn(`mb-4 overflow-hidden transition-all duration-300`, {
          'max-h-40': expanded,
          'max-h-0': !expanded,
          'overflow-y-scroll': expanded
        })}
      >
        <p>{patient.description}</p>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline" size="sm" onClick={() => onEdit(patient)}>
          <Edit className="mr-2 h-4 w-4" /> Edit
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(patient.id)}
        >
          <X className="mr-2 h-4 w-4" /> Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
