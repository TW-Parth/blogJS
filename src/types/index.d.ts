import { UserDocument } from '../src/types/models/user.model';

interface ResponsePayload {
  statusCode?: number;
  message?: string;
  data?: Object;
}

declare global {
  namespace Express {
    export interface Request {
      allParams: () => any;
      user: UserDocument;
      validatedParams: Object | any;
      token: string;
      start: number;

      files?: Express.Multer.File[];
    }

    export interface Response {
      __: (string, any?) => string;
      ok: (resPayload?: string | ResponsePayload) => void;
      error: (resPayload: string | ResponsePayload, debugMessage?: string) => void;
      internalServerError: (e: Error | any) => void;
      unauthorized: (message: string) => void;
      forbidden: () => void;
    }
  }
}
