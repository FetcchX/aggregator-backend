import express, { NextFunction, Request, Response, Router } from "express"
import TokenController from "./Controller/TokenController"

export const tokenRouter = Router() 

const tokenController = new TokenController()

tokenRouter.get("/", (req: Request, res: Response) => tokenController.getTokenList(req, res))
