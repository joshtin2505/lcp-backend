import type { Response, NextFunction } from 'express'
import { roles } from '../constant/constantes'
import type { ExtendedRequest, userToken } from '../types/user.types'

type RoleCheck = (user: userToken | undefined) => boolean

const checkRole = (
  // This function is for check if the user exist and has a role
  user: userToken | undefined,
  rolesToCheck: string[]
): boolean => {
  return user !== undefined && rolesToCheck.includes(user.role)
}

function createRoleMiddleware(roleCheck: RoleCheck) {
  // This function is for create the middleware with the role check
  return (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
      const { user } = req

      if (!roleCheck(user)) {
        // If the user doesn't have the role, return an error
        res.status(403).json({ message: 'Forbidden' })
      }
      next()
    } catch (error) {
      console.log(error)
    }
  }
}
const MasterAdmin = createRoleMiddleware((user) =>
  checkRole(user, [roles.masterAdmin])
)
const Admin = createRoleMiddleware((user) =>
  checkRole(user, [roles.masterAdmin, roles.admin])
)
const User = createRoleMiddleware((user) =>
  checkRole(user, [roles.masterAdmin, roles.admin, roles.client])
)
const validateRoll = {
  MasterAdmin,
  Admin,
  User
}

export default validateRoll
