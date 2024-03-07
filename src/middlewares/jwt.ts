/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET_KEY } from '../config'
async function createToken(payload: any) {
  return await new Promise((resolve, reject) => {
    jwt.sign(
      {
        payload
      },
      TOKEN_SECRET_KEY,
      { expiresIn: '1d' },
      (error, token) => {
        if (error) reject(error)
        resolve(token)
      }
    )
  })
}

export default createToken
