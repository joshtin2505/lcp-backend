import type { Request, Response, NextFunction } from 'express'

interface RequestWithUser extends Request {
  user: {
    roll: string | undefined
  }
}

export const authMasterAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user } = req as RequestWithUser
  if (user.roll !== 'masterAdmin') {
    return res.status(403).json({ message: 'Forbidden' })
  }
  next()
  return res.status(204).json({ message: 'Auth' }) // This line is not necessary but it's a good practice to have it
}

export const authAdmin = (req: Request, res: Response, next: NextFunction) => {
  const { user } = req as RequestWithUser
  if (user.roll !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' })
  }
  next()
  return res.status(204).json({ message: 'Auth' }) // This line is not necessary but it's a good practice to have it
}

export const authUser = (req: Request, res: Response, next: NextFunction) => {
  const { user } = req as RequestWithUser
  if (user.roll !== 'user') {
    return res.status(403).json({ message: 'Forbidden' })
  }
  next()
  return res.status(204).json({ message: 'Auth' }) // This line is not necessary but it's a good practice to have it
}
