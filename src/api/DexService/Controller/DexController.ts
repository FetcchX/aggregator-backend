import tokens from "@shared/tokens"
import { Request, Response } from "express"
import UniswapProvider from "@utils/dexes/UniswapProvider"

const uniswap = new UniswapProvider()

class DexController {

	bestDex = async (req: Request, res: Response) => {
		const { chainId, fromTokenAddress, toTokenAddress, amount } = req.query

		const fromToken = tokens[chainId as string][fromTokenAddress as string]
		const toToken = tokens[chainId as string][toTokenAddress as string]

		const uniswapData = await uniswap._getUniswapRoute(fromToken, toToken, Number(amount))

		res.status(200).send(uniswapData)
	}

}

export default DexController