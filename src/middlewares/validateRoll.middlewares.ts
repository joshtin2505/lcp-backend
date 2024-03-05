import type { Request, Response, NextFunction } from 'express'
export const authMasterAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user.roll !== 'masterAdmin')
    // fix -> Property 'user' does not exist on type 'Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>'.ts(2339)
    return res.status(401).json({ message: 'Unauthorized' })
  next()
}
