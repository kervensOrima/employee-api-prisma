import express from "express"
import morgan from "morgan"
import bodyParser from "body-parser"
import { Request, Response, NextFunction } from "express"
import { router as employeeRouter } from "./routes/employee.routes"

const app = express()
const PORT = 3000


/**
 * project middlewares
 */

app
    .use(morgan('dev'))
    .use(bodyParser.json())
    .use(employeeRouter)


/** handle api error */
app.use((req: Request, resp: Response, next: NextFunction) => {
    resp.status(404).json({
        message: 'Ressource not found',
        timestamp: new Date(),
        code: 404,
    })
})


app.listen(PORT, () => {
    console.log(`Server has been started at : http://localhost:${PORT}`)
})