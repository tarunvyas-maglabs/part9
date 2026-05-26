import { v1 as uuid } from 'uuid';
import patients from "../../data/patients.ts";
import type { NonSensitivePatientEntry, NewPatientEntry, PatientEntry } from "../types.ts";

const getNonSensitivePatients = (): NonSensitivePatientEntry[] => {
  return patients.map( ({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    ...entry,
    id: uuid()
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getNonSensitivePatients,
  addPatient
};