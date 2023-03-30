import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({ log: ['error', 'info', 'query', 'warn'] })


export const ApiResponseSuccess = (message: string, code: number, success: boolean, data: any) => {
    return {
        message,
        code,
        success,
        data,
        timestamp: new Date()
    }
}

export const ApiResponseError = (message: string, code: number, success: boolean, error: any) => {
    return {
        message,
        code,
        success,
        error,
        timestamp: new Date()
    }
}