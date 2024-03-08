/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET_KEY } from '../config'
import type { NextFunction, Request, Response } from 'express'
import type { userToken } from '../types/user.types'

interface RequestWithUser extends Request {
  user: userToken
}
export function validateToken(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  const token: string = req.cookies.token

  if (!token) {
    // If there is no token, return an error
    res.status(401).json({ message: 'No token, authorization denied 0_0' })
  }

  try {
    jwt.verify(token, TOKEN_SECRET_KEY, (err, user) => {
      // If there is a token, verify it
      if (err) res.status(403).json({ message: 'Token is not valid :(' }) // If the token is not valid, return an error
      req.user = user as userToken
      res.status(204).json({ message: 'Auth!!! :)' }) // This line is not necessary but it's a good practice to have it
    })
  } catch (err) {
    // If there is an error, return an error
    console.log(err)
    res.status(500).json({ message: 'Token Error' })
  }
  next()
}
