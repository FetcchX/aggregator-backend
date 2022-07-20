import tokens from "@shared/tokens"
import { Request, Response } from "express"
import UniswapProvider from "@utils/dexes/UniswapProvider"
import Bridges from "@utils/bridges"
import { CoinKey } from "@wagpay/types"

const uniswap = new UniswapProvider()
const bridges = new Bridges()

class DexController {

	best_dex = async (req: Request, res: Response) => {
		const { chainId, fromToken, toToken, amount } = req.query

		const data = await bridges.bestDex(
			Number(chainId),
			fromToken as CoinKey,
			toToken as CoinKey,
			amount as string
		)

		res.status(200).send(data)
	}

}

export default DexController