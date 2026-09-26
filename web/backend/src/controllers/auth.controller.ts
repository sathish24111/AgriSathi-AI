import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/env.config';
import { sendSuccess, sendError } from '../utils/responseHandler';

export const login = async (req: Request, res: Response) => {
  try {
    const { phone } = req.body;
    if (!phone) {
      return sendError(res, 'Phone number is required', 400);
    }

    const token = jwt.sign({ phone, id: 'usr_1' }, config.jwtSecret, { expiresIn: '7d' });
    return sendSuccess(res, {
      token,
      user: {
        id: 'usr_1',
        name: 'Sambhaji Patil',
        phone,
        location: 'Nashik, Maharashtra',
        preferredLanguage: 'mr',
        totalLandAcres: 3.5,
      },
    }, 'Authentication successful');
  } catch (error) {
    return sendError(res, 'Login failed', 500, error);
  }
};

