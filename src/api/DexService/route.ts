import express, { NextFunction, Request, Response, Router } from "express"
import DexController from "./Controller/DexController"

export const dexRouter = Router() 

const dexController = new DexController()

dexRouter.get("/best-dex", (req: Request, res: Response) => dexController.bestDex(req, res))
