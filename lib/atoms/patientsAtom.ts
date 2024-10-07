import { atom } from 'jotai';

import { Patient } from '@/types/Patients';

type PatientAtom = Patient[];

const initialState: Patient[] = [];

const stateAtom = atom<PatientAtom>(initialState);

// simple atom to store the patients
// this should only be a getter in a more complex app, but for simplicity we are using a setter
// a better approach would be to create a separate atom for each patient action (add, edit, delete)
// and then use a derived atom to combine them (consider https://jotai.org/docs/extensions/query)
export const patientsAtom = atom(
  (get) => get(stateAtom),
  (get, set, patients: PatientAtom) => {
    const currentState = get(stateAtom);

    set(stateAtom, patients ?? currentState);
  }
);
