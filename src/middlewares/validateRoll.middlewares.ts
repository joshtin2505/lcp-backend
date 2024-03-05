import type { Request, Response, NextFunction } from 'express'
interface RequestWithUser extends Request {
  user: {
    roll: string
  }
}

export const authMasterAdmin = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  if (req.user.roll !== 'masterAdmin') {
    return res.status(403).json({ message: 'Forbidden' })
  }
  next()
  return res.status(204).json({ message: 'Auth' }) // This line is not necessary but it's a good practice to have it
}

export const authAdmin = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  if (req.user.roll !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' })
  }
  next()
  return res.status(204).json({ message: 'Auth' }) // This line is not necessary but it's a good practice to have it
}

export const authUser = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  if (req.user.roll !== 'user') {
    return res.status(403).json({ message: 'Forbidden' })
  }
  next()
  return res.status(204).json({ message: 'Auth' }) // This line is not necessary but it's a good practice to have it
}
