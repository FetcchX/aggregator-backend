import { ChainId, CoinKey, Token, tokens } from "@wagpay/types";

enum DexId {
	Uniswap = "Uniswap",
	Sushi = "Sushi"
}

interface Dex {
	logoUri: string;
	name: string;
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

export interface UniswapData {
	dex: number | string;
	fees: number;
	chainId: number;
	fromToken: Token;
	toToken: Token;
	amountToGet: number;
}

const dexAddress: any = {
	1: '0x5B353Ce3a3D8Ee1d4684AF349856fB7E8F0fE80D',
	137: '0x7cbbc355a50e19a58c2d8c24be46eef03093edf7'
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

			let uniswapData: UniswapData = {
				dex: dexAddress[Number(fromChain)],
				fees: 0,
				chainId: Number(from_token.chainId.toString()),
				fromToken: from_token,
				toToken: to_token,
				amountToGet: amount,
			};
			// console.log(toToken, from_token);
			if (
				(from_token.chainAgnositcId.startsWith("USD") &&
					to_token.chainAgnositcId.startsWith("USD")) ||
				from_token.chainAgnositcId === to_token.chainAgnositcId
			) {
				uniswapData.fees = amount * 0.003
				uniswapData.amountToGet = amount - uniswapData.fees
				return uniswapData;
			}

			const coingeckoName = {
				MATIC: "matic-network",
				ETH: "ethereum",
			};

			var fromTokenPrice;

			if (
				from_token.chainAgnositcId === "MATIC" ||
				from_token.chainAgnositcId === "ETH"
			) {
				fromTokenPrice = await fetch(
					`https://api.coingecko.com/api/v3/simple/price?ids=${coingeckoName[from_token.chainAgnositcId]
					}&vs_currencies=usd`
				);
				fromTokenPrice = await fromTokenPrice.json();
				fromTokenPrice =
					fromTokenPrice[coingeckoName[from_token.chainAgnositcId]].usd;
				fromTokenPrice = fromTokenPrice * amount;
			} else fromTokenPrice = amount;

			if (to_token.chainAgnositcId === "MATIC") {
				let toTokenPrice: any = await fetch(
					`https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd`
				);
				toTokenPrice = await toTokenPrice.json();
				toTokenPrice = toTokenPrice["matic-network"].usd;

				uniswapData.amountToGet = fromTokenPrice / toTokenPrice;
				uniswapData.fees =
					uniswapData.amountToGet * Number(toTokenPrice) * 0.003;
			} else if (to_token.chainAgnositcId === "ETH") {
				let toTokenPrice: any = await fetch(
					`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`
				);
				toTokenPrice = await toTokenPrice.json();
				toTokenPrice = toTokenPrice["ethereum"].usd;

				uniswapData.amountToGet =
					(fromTokenPrice - Number(fromTokenPrice) * 0.003) /
					Number(toTokenPrice);
				uniswapData.fees = Number(fromTokenPrice) * 0.003;
			} else if (to_token.chainAgnositcId.startsWith("USD")) {
				uniswapData.amountToGet =
					Number(fromTokenPrice) - Number(fromTokenPrice) * 0.003;
				uniswapData.fees = Number(fromTokenPrice) * 0.003;
			}
			return uniswapData;
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

			let uniswapData: UniswapData = {
				dex: dexAddress[Number(fromChain)],
				fees: 0,
				chainId: Number(from_token.chainId.toString()),
				fromToken: from_token,
				toToken: to_token,
				amountToGet: amount,
			};
			// console.log(toToken, from_token);
			if (
				(from_token.chainAgnositcId.startsWith("USD") &&
					to_token.chainAgnositcId.startsWith("USD")) ||
				from_token.chainAgnositcId === to_token.chainAgnositcId
			) {
				return uniswapData;
			}

			const coingeckoName = {
				MATIC: "matic-network",
				ETH: "ethereum",
			};

			var fromTokenPrice;

			if (
				from_token.chainAgnositcId === "MATIC" ||
				from_token.chainAgnositcId === "ETH"
			) {
				fromTokenPrice = await fetch(
					`https://api.coingecko.com/api/v3/simple/price?ids=${coingeckoName[from_token.chainAgnositcId]
					}&vs_currencies=usd`
				);
				fromTokenPrice = await fromTokenPrice.json();
				fromTokenPrice =
					fromTokenPrice[coingeckoName[from_token.chainAgnositcId]].usd;
				fromTokenPrice = fromTokenPrice * amount;
			} else fromTokenPrice = amount;

			if (to_token.chainAgnositcId === "MATIC") {
				let toTokenPrice: any = await fetch(
					`https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd`
				);
				toTokenPrice = await toTokenPrice.json();
				toTokenPrice = toTokenPrice["matic-network"].usd;

				uniswapData.amountToGet = fromTokenPrice / toTokenPrice;
				uniswapData.fees =
					uniswapData.amountToGet * Number(toTokenPrice) * 0.003;
			} else if (to_token.chainAgnositcId === "ETH") {
				let toTokenPrice: any = await fetch(
					`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`
				);
				toTokenPrice = await toTokenPrice.json();
				toTokenPrice = toTokenPrice["ethereum"].usd;

				uniswapData.amountToGet =
					(fromTokenPrice - Number(fromTokenPrice) * 0.003) /
					Number(toTokenPrice);
				uniswapData.fees = Number(fromTokenPrice) * 0.003;
			} else if (to_token.chainAgnositcId.startsWith("USD")) {
				uniswapData.amountToGet =
					Number(fromTokenPrice) - Number(fromTokenPrice) * 0.003;
				uniswapData.fees = Number(fromTokenPrice) * 0.003;
			}
			return uniswapData;
		}
	}
];
