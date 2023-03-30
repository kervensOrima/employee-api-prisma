import { Router } from 'express'
import { deleteController, employeePagination, findAll, findEmployeeByPk, saveController, statisticsController } from '../controllers/employee.controller'

export const router = Router()


/** endpoint for employee */

// router.get('/api/v1/employees/', api)


/** findAll employee in the database */
router.get('/api/v1/employees/', findAll)


/** save one employee in the database */
router.post('/api/v1/employees/', saveController)


/** get single record in the database */
router.get('/api/v1/employees/:pk/', findEmployeeByPk)


/** delete employee by pk */
router.delete('/api/v1/employees/:pk/', deleteController)


/**  get employee by page */
router.get('/api/v1/page/employees/', employeePagination)


/** employee statistics */
router.get('/api/v1/statistics/employees/', statisticsController)






