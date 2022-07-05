import express, { NextFunction, Request, Response, Router } from "express";
import BridgeController from "./Controller/BridgeController";

export const bridgeRouter = Router();

const bridgeController = new BridgeController();

bridgeRouter.get("/best-route", (req: Request, res: Response) =>
	bridgeController.bestBridge(req, res)
);
bridgeRouter.get("/execute-best-route", (req: Request, res: Response) =>
	bridgeController.executeBridge(req, res)
);
bridgeRouter.get("/test", (req: Request, res: Response) =>
	bridgeController.test(req, res)
);
