import { Gender, type NewPatientEntry } from "./types.ts";

export const parseNewPatientEntry = (object: unknown): NewPatientEntry => {
  if(!object || typeof object !== 'object') {
    throw new Error('Missing or invalid entry');
  }
  if('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
    const newPatientEntry: NewPatientEntry = {
      name: parseString(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseString(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation)
    };
    return newPatientEntry;
  }
  throw new Error('Invalid or missing fields');
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (str: unknown): string => {
  if(!isString(str)) {
    throw new Error('Invalid name: ' + str);
  }
  return str;
};

const parseDate = (date: unknown): string => {
  if(!isString(date) || !isDate(date)) {
    throw new Error('Invalid date: ' + date);
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Invalid gender: ' + gender);
  }
  return gender;
};

const isGender = (param: string): param is Gender => {
  return (Object.values(Gender) as string[]).includes(param);
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};
