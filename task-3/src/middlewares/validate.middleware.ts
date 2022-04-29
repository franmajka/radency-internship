import {Request, Response, NextFunction} from 'express'
import { ValidationError } from 'yup';
import { ObjectShape, OptionalObjectSchema } from "yup/lib/object";


export const validateMiddleware = (
  <TShape extends ObjectShape>
  (schema: OptionalObjectSchema<TShape>) => (
    (req: Request, res: Response, next: NextFunction) => {
      schema.validateSync(req.body);
      req.body = schema.cast(req.body);
      next()
    }
  )
)
