import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import { IUser } from '../types/models';

/**
 * Simple authentication middleware using an API key in the header
 * This replaces JWT-based authentication
 */
export default async function(req: Request, res: Response, next: NextFunction) {
  // Get API key from header
  const apiKey = req.header('x-auth-token');

  if (!apiKey) {
    return res.status(401).json({ msg: 'No authentication token, authorization denied' });
  }

  try {
    const user = await User.findById(apiKey).select('-password');
    
    if (!user) {
      return res.status(401).json({ msg: 'Invalid authentication token' });
    }
    
    // Set user in request object
    req.user = user as unknown as IUser;
    next();
  } catch (err) {
    console.error('Auth error:', err);
    res.status(401).json({ msg: 'Invalid authentication token' });
  }
}