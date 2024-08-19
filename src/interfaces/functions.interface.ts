import { Request } from 'express';
import { ValidationResult } from 'joi';

export type RequestValidator = (req: Request) => ValidationResult;
