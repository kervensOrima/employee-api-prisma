import { prisma } from "../config/script"

export const save = (employeeDTO: any) => {
    return prisma.employee.create({
        data: employeeDTO,
        include: { address: true, phones: true, _count: true }
    })
}

export const findMany = () => {
    return prisma.employee.findMany({ include: { address: true, phones: true, _count: true } })
}

export const deleteEmployee = (id: number) => {
    const employee = findByPk(id)

    return prisma.employee.delete({ where: { employee_pk: id } })
        .then(_ => {
            return employee
        })
        .catch(err => {
            throw new Error(err)
        })
}

export const update = (employeeDTO: any, id: number) => {
}


export const findByPk = (pk: number) => {
    return prisma.employee.findUnique({ where: { employee_pk: pk }, include: { address: true, phones: true } })
        .then(employee => {
            if (employee === null)
                throw new Error(`employee with pk ${pk} not found`)

            return employee
        })
        .catch(err => {
            throw new Error(`error loading employee record in the database, Error: ${err}`)
        })
}


export const findManyByStatus = (status: any, contract: any, page: number, limit: number) => {
    return prisma.employee.findMany({
        where: {
            OR: [
                { typeContract: contract },
                { status: status }
            ]
        },
        include: { address: true, phones: true, _count: true },
        orderBy: { createdAt: 'asc' },
        skip: page,
        take: limit
    })
        .then(employees => {
            // console.log(employees)
            return employees
        })
        .catch(err => {
            throw new Error(`error loading employee record by status ${status} and contract ${contract}, error: ${err}`)
        })
}


export const updateService = (employeeDTO: any, pk: number) => {
    try {
        findByPk(pk)

        /**  update the employee */
        return prisma.employee.update({
            data: employeeDTO,
            
            where: {
                employee_pk: pk
            }
        })
    } catch (err) {
        throw new Error('Error while updating employee')
    }

}


export const statistics = async () => {
    /*** get the statistics for the status */
    const status_statistics = await prisma.employee.groupBy({
        by: ['status'],
        _count: {
            _all: true,
        },
        _max: {
            salary: true
        },
        _min: {
            salary: true
        },
        _sum: {
            salary: true
        }
    })

    /** get the statistics for the type of contract */
    const contractType = await prisma.employee.groupBy({
        by: ['typeContract'],
        _count: {
            _all: true
        },
        _max: {
            salary: true
        },
        _min: {
            salary: true
        },
        _sum: {
            salary: true
        }
    })


    const contract = await prisma.employee.groupBy({
        by: ['contract'],
        _count: {
            _all: true
        },
        _max: {
            salary: true
        },
        _min: {
            salary: true
        },
        _sum: {
            salary: true
        }
    })

    /** return all satistics */
    return {
        status_statistics,
        contractType,
        contract
    }

}