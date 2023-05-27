import { Request, Response, NextFunction } from "express";
import { Types } from 'mongoose';

const validateMongoDBId =
  (req: Request, res: Response, next: NextFunction) => {   
    try {
        if (!Types.ObjectId.isValid(req.params.id)) {
            throw new Error();
        }
        next();
      } catch (error) {
        return res.status(400).send('Invalid format of MongoDB id');
      }
  };

export default validateMongoDBId;