import { Request, Response } from "express"
import { ApiResponseError, ApiResponseSuccess } from "../config/script"
import { deleteEmployee, findByPk, findMany, findManyByStatus, save, statistics, updateService } from "../services/employee.service"
import { Status, ContractType } from '@prisma/client'


export const api = (req: Request, resp: Response) => {
    return resp.json("Works sucessfully")
}

export const findAll = (req: Request, resp: Response) => {
    return findMany()
        .then(employees => {
            const message = `successfully get the list of the employees`
            return resp.json(
                ApiResponseSuccess(message, 200, true, employees)
            )
        })
        .catch(err => {
            const message = `error occurred while loading employee in the database`
            resp.status(500).json(
                ApiResponseError(
                    message,
                    500,
                    false,
                    err
                )
            )
        })
}


export const saveController = (req: Request, resp: Response) => {
    const { address, phones, ...employeeDTO } = req.body
    save({ ...employeeDTO, phones: { create: phones }, address: { create: address } })
        .then(employee => {
            const message = `employee save successfully in the database`
            return resp.json(
                ApiResponseSuccess(message, 200, true, employee)
            )
        })
        .catch(err => {
            const message = `error occured while saving employee in the database`
            return resp.status(500).json(
                ApiResponseError(message, 500, false, err)
            )
        })
}


export const deleteController = (req: Request, resp: Response) => {
    deleteEmployee(Number(req.params.pk))
        .then(emp => {
            return resp.json(
                ApiResponseSuccess('employee successfully deleted', 200, true, emp)
            )
        })
        .catch(err => {
            resp.status(500).json(ApiResponseError('error occuring while deleting employee', 500, false, err))
        })

}


export const findEmployeeByPk = (req: Request, resp: Response) => {
    const pk = req.params.pk
    findByPk(Number(pk))
        .then(employee => {
            return resp.json(
                ApiResponseSuccess(`succesfully get the single employee ${employee.employee_pk}`, 200, true, employee)
            )
        })
        .catch(err => {
            return resp.status(500).json(
                ApiResponseError(`Error occured while get single record in the database`, 500, false, err)
            )
        })
}

export const employeePagination = (req: Request, resp: Response) => {
    const status = req.query.status ?? Status.ACTIVE
    const contractType = req.query.contractType ?? ContractType.BASIC
    const page = req.query.page ?? 1
    const limit = req.query.limit ?? 18

    if (Number(page) <= 0 || Number(limit) <= 0) {
        return resp.status(402).json(ApiResponseError('page or size must be positive', 402, false, undefined))
    }

    findManyByStatus(status, contractType, Number(page), Number(limit))
        .then(pagination => {
            return resp.json({
                page,
                status,
                contractType,
                pagination: {
                    content: pagination
                }
            })
        })
        .catch(err => {
            return resp.status(500).json(ApiResponseError('error occuring while loading employee', 500, false, err))
        })

}



export const updateEmployeeController = (req: Request, resp: Response) => {
    const { address, phones, ...emp } = req.body
    const employee_pk = req.params.pk

    updateService({ ...emp, phones: { connectOrCreate: phones }, address: { connectOrCreate: address } }, Number(employee_pk))
        .then(emp => {
            const message = `employee update successfully in the database`
            return resp.json(
                ApiResponseSuccess(message, 200, true, emp)
            )
        })
        .catch(err => {
            const message = `error occured while saving employee in the database`
            return resp.status(500).json(
                ApiResponseError(message, 500, false, err)
            )
        })
}


export const statisticsController = (req: Request, resp: Response) => {
    statistics()
        .then(statistics => {
            return resp.json(ApiResponseSuccess('statistics from employee successfully get', 200, true, statistics))
        })
        .catch(err => {
            return resp.status(500).json(ApiResponseError('error occuring to get the statisitcs', 500, false, err))
        })
}




