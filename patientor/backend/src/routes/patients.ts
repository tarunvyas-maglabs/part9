import { z } from 'zod';
import express, { type Response } from 'express';
import { type NonSensitivePatientEntry, NewPatientEntrySchema } from '../types.ts';
import patientService from '../services/patientService.ts';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatientEntry[]>) => {
  res.send(patientService.getNonSensitivePatients());
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = NewPatientEntrySchema.parse(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({error: 'unknown error'});
    }
  }
});

export default router;