import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';

import express, { NextFunction, Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import 'express-async-errors';
import { bridgeRouter } from './api/BridgeService/route';
import { dexRouter } from './api/DexService/route';
import cors from "cors"
import { tokenRouter } from './api/TokenService/router';


// Constants
const app = express();


/***********************************************************************************
 *                                  Middlewares
 **********************************************************************************/

// Common middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:3000', "https://wagpay.xyz"]
}))

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Security (helmet recommended in express docs)
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

app.use('/api/bridge/', bridgeRouter)
app.use('/api/dex/', dexRouter)
app.use('/api/token/', tokenRouter)


/***********************************************************************************
 *                         API routes and error handling
 **********************************************************************************/

// Add api router

// Error handling
// app.use((err: Error, _: Request, res: Response, __: NextFunction) => {
//     logger.err(err, true);
//     const status = (err instanceof CustomError ? err.HttpStatus : StatusCodes.BAD_REQUEST);
//     return res.status(status).json({
//         error: err.message,
//     });
// });

// Export here and start in a diff file (for testing).
export default app;
