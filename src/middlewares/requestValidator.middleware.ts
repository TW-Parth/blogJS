import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'joi';

export default (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const params = req.allParams();

    const valid = schema.validate(params);

    req.validatedParams = valid.value;

    if (valid.error) {
      return res.error(valid.error);
    }

    next();
  };
};
