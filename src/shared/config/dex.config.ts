import { ChainId, CoinKey, tokens, UniswapData } from "@wagpay/types";

enum DexId {
	Uniswap = "Uniswap",
	Sushi = "Sushi"
}

interface Dex {
	logoUri: string;
	name: DexId;
	contract: { [key: string]: string };
	supported_chains: ChainId[];
	supported_coins: CoinKey[];
	getTransferFees: (
		fromChain: ChainId,
		fromToken: CoinKey,
		toToken: CoinKey,
		amount: number
	) => Promise<UniswapData>;
}

export const dexes: Dex[] = [
	{
		logoUri: "",
		name: DexId.Uniswap,
		contract: {
			1: '',
			137: ''
		},
		supported_chains: [ChainId.ETH, ChainId.POL],
		supported_coins: [
			CoinKey.MATIC,
			CoinKey.ETH,
			CoinKey.USDC,
			CoinKey.USDT,
			CoinKey.DAI,
		],
		getTransferFees: async (fromChain: ChainId, fromToken: CoinKey, toToken: CoinKey, amount: number): Promise<UniswapData> => {
			const from_token = tokens[Number(fromChain)][fromToken]
			const to_token = tokens[Number(fromChain)][toToken]

			return {
				dex: dexes[0].contract[fromChain],
				fees: 0,
				chainId: Number(fromChain),
				fromToken: from_token,
				toToken: to_token,
				amountToGet: amount
			}
		}
	},
	{
		logoUri: "",
		name: DexId.Sushi,
		contract: {
			1: '',
			137: ''
		},
		supported_chains: [ChainId.ETH, ChainId.POL],
		supported_coins: [
			CoinKey.MATIC,
			CoinKey.ETH,
			CoinKey.USDC,
			CoinKey.USDT,
			CoinKey.DAI,
		],
		getTransferFees: async (fromChain: ChainId, fromToken: CoinKey, toToken: CoinKey, amount: number): Promise<UniswapData> => {
			const from_token = tokens[Number(fromChain)][fromToken]
			const to_token = tokens[Number(fromChain)][toToken]

			return {
				dex: dexes[0].contract[fromChain],
				fees: 0,
				chainId: Number(fromChain),
				fromToken: from_token,
				toToken: to_token,
				amountToGet: amount
			}
		}
	}
];
