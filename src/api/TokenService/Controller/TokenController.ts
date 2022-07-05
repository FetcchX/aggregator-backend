import express, { Request, Response } from "express";
import { ethers } from "ethers";
import fetch from "cross-fetch";
import {
	CoinKey,
	ChainId,
	Token,
	chainsSupported,
	tokensSupported,
	tokens,
	coinEnum,
	chainEnum,
	AllowDenyPrefer,
	BridgeId,
} from "@wagpay/types";
import { bridges } from "@shared/config";

class TokenController {
	getTokenList = async (req: Request, res: Response) => {
		const supported_bridges = bridges;

		for (let i = 0; i < supported_bridges.length; i++) {
			const bridge = supported_bridges[i];

			if (bridge.name === BridgeId.Hyphen) {
				// const tokens =
				// https://hyphen-v2-api.biconomy.io/api/v1/admin/supported-token/list?networkId=137
			} else if (bridge.name === BridgeId.Hop) {
			} else if (bridge.name === BridgeId.Celer) {
			}
		}

		res.status(200).send(supported_bridges);
	};
}

export default TokenController;
