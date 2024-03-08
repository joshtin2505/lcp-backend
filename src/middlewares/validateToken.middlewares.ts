/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET_KEY } from '../config'
import type { NextFunction, Response } from 'express'
import type { ExtendedRequest, userDecodetToken } from '../types/user.types'

export function validateToken(
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { token }: { token?: string } = req.cookies
    if (token === undefined) {
      // If there is no token, return an error
      res.status(401).json({ message: 'No token, authorization denied 0_0' })
      return
    }
    jwt.verify(token, TOKEN_SECRET_KEY, (err, decoded) => {
      // If there is a token, verify it
      err && res.status(403).json({ message: 'Token is not valid :(' }) // If the token is not valid, return an error
      !decoded && res.status(403).json({ message: 'Token is not valid :(' }) // If the token is not valid, return an error

      const { payload: user } = decoded as userDecodetToken
      req.user = user
    })
  } catch (err) {
    // If there is an error, return an error
    console.log(err)
    res.status(500).json({ message: 'Token Error' })
  }
  next()
}
