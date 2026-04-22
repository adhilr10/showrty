import type { Request, Response } from 'express';

const register = async (req: Request, res: Response): Promise<void> => {
  res.json(req.body);
};

export default register;
