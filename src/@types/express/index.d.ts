// express.d.ts
import * as express from 'express';

import { UserAttributeI } from '@src/interfaces/user.interface';

import { QueryOpts } from '@src/interfaces/queryOpts.interface';

declare global {
  namespace Express {
    interface Request {
      token?: string; // Use ? to make it optional
      user?: Partial<UserAttributeI>;
      queryOpts?: QueryOpts;
      paramIds?: {
        [key: string]: number;
      };
    }
  }
}
