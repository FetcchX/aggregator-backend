import { Hop } from "@hop-protocol/sdk";
import { tokens, ChainId, CoinKey } from "@wagpay/types";
import { Chain } from "@hop-protocol/sdk";
import { ethers } from "ethers";
import { BigNumber } from "ethers";

export enum BridgeId {
	Hyphen = "Hyphen",
	Hop = "Hop",
	Celer = "Celer",
	Across = "Across",
	Connext = "Connext",
	PolygonPOS = "PolygonPOS",
}

export enum DexId {
	Uniswap = "Uniswap",
}

export interface FeesInterface {
	gasFees: string;
	amountToGet: string;
	transferFee: string;
	bridgeTime: string;
	extraData: any;
}

export interface Bridge {
	logoUri: string;
	name: BridgeId;
	contract: { [key: number]: string };
	supported_chains: ChainId[];
	supported_coins: CoinKey[];
	getTransferFees: (
		fromChain: ChainId,
		toChain: ChainId,
		fromToken: CoinKey,
		amount: string
	) => Promise<FeesInterface>;
}

export interface Dex {
	logoUri: string;
	name: DexId;
	contract: string;
	supported_chains: ChainId[];
	supported_coins: CoinKey[];
}

export const bridges: Bridge[] = [
	{
		logoUri: "https://raw.githubusercontent.com/WagPay/aggregator-frontend/main/public/images/download.png?token=GHSAT0AAAAAABV7XCKKSW374EFEELSY2TTMYW2NVQQ",
		name: BridgeId.Hyphen,
		contract: {
			1: "0x8F255067135192B7C226821011271F26e627904a",
			137: "0xf0AdF157c4E7b92FfeAb045816560F41ff930DD2",
		},
		supported_chains: [ChainId.ETH, ChainId.AVA, ChainId.BSC, ChainId.POL],
		supported_coins: [
			CoinKey.AVAX,
			CoinKey.MATIC,
			CoinKey.ETH,
			CoinKey.USDC,
			CoinKey.USDT,
			CoinKey.BNB,
			CoinKey.WETH,
		],
		getTransferFees: async (
			fromChain: ChainId,
			toChain: ChainId,
			fromToken: CoinKey,
			amount: string
		): Promise<FeesInterface> => {
			let fees: FeesInterface = {
				gasFees: "",
				amountToGet: "",
				transferFee: "",
				bridgeTime: "5",
				extraData: {}
			};

			const fromTokenAddress = tokens[fromChain as number][fromToken];

			const HYPHEN_BASE_URL = "https://hyphen-v2-api.biconomy.io/api/v1";
			console.log(
				`${HYPHEN_BASE_URL}/data/transferFee?fromChainId=${fromChain}&toChainId=${toChain}&tokenAddress=${fromTokenAddress.address}&amount=${amount}`
			);
			try {
				const res = await fetch(
					`${HYPHEN_BASE_URL}/data/transferFee?fromChainId=${fromChain}&toChainId=${toChain}&tokenAddress=${fromTokenAddress.address}&amount=${amount}`
				);
				if (res.status >= 400) throw "Error 404";
				const data = await res.json();
				try {
					// const provider = new ethers.providers.JsonRpcProvider(
					// 	fromChain === ChainId.ETH
					// 		? "https://eth-mainnet.g.alchemy.com/v2/y141okG6TC3PecBM1mL0BfST9f4WQmLx"
					// 		: "https://polygon-mainnet.g.alchemy.com/v2/oD--2OO92oeHck5VCVI4hKEnYNCQ8F1d"
					// );
					// let signer = await ethers.Wallet.createRandom();
					// signer = signer.connect(provider);
					// const contract = new ethers.Contract(
					// 	fromChain === ChainId.ETH
					// 		? "0x8F255067135192B7C226821011271F26e627904a"
					// 		: "0xf0AdF157c4E7b92FfeAb045816560F41ff930DD2",
					// 	[
					// 		"function transferNative(uint amount, address receiver, uint64 toChainId, bytes memory) external payable",
					// 		"function transferERC20(uint64 toChainId, address tokenAddress, address receiver, uint256 amount, bytes memory) external",
					// 	],
					// 	signer
					// );

					// if (
					// 	fromTokenAddress.address.toLowerCase() ===
					// 	"0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE".toLowerCase()
					// ) {
					// 	console.log(contract, "1");
					// 	fees.gasFees = await contract.transferNative(
					// 		BigNumber.from(amount),
					// 		"0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
					// 		Number(toChain),
					// 		"0x00"
					// 	);
					// 	fees.gasFees = fees.gasFees.toString();
					// } else {
					// 	try {
					// 		fees.gasFees = await contract.transferERC20(
					// 			BigNumber.from(amount),
					// 			fromTokenAddress.address,
					// 			"0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
					// 			Number(toChain),
					// 			"0x00"
					// 		);
					// 	} catch (e) {
					// 		console.log(e);
					// 	}
					// 	console.log("122");
					// 	fees.gasFees = fees.gasFees.toString();
					// }

					// console.log(fees);

					fees = {
						gasFees: data["gasFee"],
						amountToGet: data["amountToGet"],
						transferFee: data["transferFee"],
						bridgeTime: "2",
						extraData: {}
					};
				} catch (e) {
					fees = {
						gasFees: "0",
						amountToGet: "0",
						transferFee: "0",
						bridgeTime: "2",
						extraData: {}
					};
				}

				return fees;
			} catch (e) {
				console.log(e, "HYPHENNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN");
				return e
			}
		},
	},
	{
		logoUri: "https://raw.githubusercontent.com/WagPay/aggregator-frontend/main/public/images/BVcNR51u_400x400.jpg?token=GHSAT0AAAAAABV7XCKLWKUOPZAY2CSO3DUYYW2NTUQ",
		name: BridgeId.Hop,
		contract: {
			1: "",
			137: "0xcC5a4A7d908CB869a890051aA7Ba12E9719F2AFb",
		},
		supported_chains: [ChainId.ETH, ChainId.AVA, ChainId.BSC, ChainId.POL],
		supported_coins: [
			CoinKey.AVAX,
			CoinKey.MATIC,
			CoinKey.ETH,
			CoinKey.USDC,
			CoinKey.USDT,
			CoinKey.BNB,
			CoinKey.DAI,
			CoinKey.WETH,
		],
		getTransferFees: async (
			fromChain: ChainId,
			toChain: ChainId,
			fromToken: CoinKey,
			amount: string
		): Promise<FeesInterface> => {
			let fees: FeesInterface = {
				gasFees: "",
				amountToGet: "",
				transferFee: "",
				bridgeTime: "15",
				extraData: {}
			};

			const signer = ethers.Wallet.createRandom();
			const token = tokens[fromChain as number][fromToken];
			const hopChains: any = {
				1: Chain.Ethereum,
				137: Chain.Polygon,
			};

			try {
				const hop = new Hop("mainnet");
				const bridge = hop
					.connect(signer)
					.bridge(token.chainAgnositcId);

				const fromChainHop = hopChains[fromChain];
				const toChainHop = hopChains[toChain];

				let sendData: any = await bridge.getSendData(
					amount,
					fromChainHop,
					toChainHop
				);
				const keys = Object.keys(sendData);

				for (let i = 0; i < keys.length; i++) {
					if (typeof sendData[keys[i]] == "object") {
						sendData[keys[i]] = sendData[keys[i]].toString();
					}
				}

				// console.log(sendData["estimatedReceived"], token)
				try {
					fees = {
						gasFees: "0",
						amountToGet: ethers.utils.formatUnits(
							sendData["estimatedReceived"],
							token.decimals
						),
						transferFee: ethers.utils.formatUnits(
							sendData["adjustedBonderFee"],
							token.decimals
						),
						bridgeTime: "10",
						extraData: {
							bonderFee: sendData["adjustedBonderFee"]
						}
					};
				} catch (e) {
					fees = {
						gasFees: "0",
						amountToGet: "0",
						transferFee: "0",
						bridgeTime: "10",
						extraData: {}
					};
				}
			} catch (e) {
				console.error("HOP ERROR");
			}

			return fees;
		},
	},
	{
		logoUri: "https://raw.githubusercontent.com/WagPay/aggregator-frontend/main/public/images/B_whzxUt_400x400.jpg?token=GHSAT0AAAAAABV7XCKKPQYMOCGJ3HXKVK3GYW2N23Q",
		name: BridgeId.Celer,
		contract: {
			1: "",
			137: "0x138C20AAc0e1602a92eCd2BF4634098b1d5765f1",
		},
		supported_chains: [ChainId.ETH, ChainId.AVA, ChainId.BSC, ChainId.POL],
		supported_coins: [
			CoinKey.AVAX,
			CoinKey.MATIC,
			CoinKey.ETH,
			CoinKey.USDC,
			CoinKey.USDT,
			CoinKey.BNB,
			CoinKey.WETH,
		],
		getTransferFees: async (
			fromChain: ChainId,
			toChain: ChainId,
			fromToken: CoinKey,
			amount: string
		): Promise<FeesInterface> => {
			let tokenName = tokens[fromChain as number][fromToken].symbol;

			let fees: FeesInterface = {
				gasFees: "",
				amountToGet: "",
				transferFee: "",
				bridgeTime: "20",
				extraData: {}
			};

			const fromTokenAddress = tokens[fromChain as number][fromToken];

			const CELER_BASE_URL =
				"https://cbridge-prod2.celer.network/v2/estimateAmt";
			try {
				// console.log(
				// 	`${CELER_BASE_URL}?src_chain_id=${fromChain}&dst_chain_id=${toChain}&token_symbol=${tokenName}&amt=${amount}&usr_addr=0xaa47c83316edc05cf9ff7136296b026c5de7eccd&slippage_tolerance=3000`
				// );
				const res = await fetch(
					`${CELER_BASE_URL}?src_chain_id=${fromChain}&dst_chain_id=${toChain}&token_symbol=${tokenName}&amt=${amount}&usr_addr=0xaa47c83316edc05cf9ff7136296b026c5de7eccd&slippage_tolerance=3000`
				);
				if (res.status >= 400) throw "Error 404";
				const data = await res.json();
				// console.log(data);
				try {
					fees = {
						gasFees: ethers.utils.formatUnits(
							data["drop_gas_amt"],
							fromTokenAddress.decimals
						),
						amountToGet: ethers.utils.formatUnits(
							data["estimated_receive_amt"],
							fromTokenAddress.decimals
						),
						transferFee: ethers.utils.formatUnits(
							data["base_fee"],
							fromTokenAddress.decimals
						),
						bridgeTime: "15",
						extraData: {
							nonce: new Date().getTime(),
							slippage: data["max_slippage"]
						}
					};
				} catch (e) {
					fees = {
						gasFees: "0",
						amountToGet: "0",
						transferFee: "0",
						bridgeTime: "15",
						extraData: {}
					};
				}
			} catch (e) {
				console.log("CELER ERROR");
			}

			return fees;
		},
	},
	{
		logoUri: "https://raw.githubusercontent.com/WagPay/aggregator-frontend/main/public/images/aSjf3j3P_400x400.jpg?token=GHSAT0AAAAAABV7XCKKPNVOVEF5GCUJC3XKYW2N3SA",
		name: BridgeId.Across,
		contract: {
			1: "",
			137: "15",
		},
		supported_chains: [ChainId.ETH, ChainId.POL],
		supported_coins: [
			CoinKey.MATIC,
			CoinKey.ETH,
			CoinKey.USDC,
			CoinKey.DAI,
			CoinKey.WETH,
		],
		getTransferFees: async (
			fromChain: ChainId,
			toChain: ChainId,
			fromToken: CoinKey,
			amount: string
		): Promise<FeesInterface> => {
			let tokenName = tokens[fromChain as number][fromToken].symbol;

			let fees: FeesInterface = {
				gasFees: "",
				amountToGet: "",
				transferFee: "",
				bridgeTime: "",
				extraData: {}
			};

			const fromTokenAddress = tokens[fromChain as number][fromToken];
			let allowed, allowedData;

			try {
				allowed = await fetch(
					`https://across.to/api/limits?token=${fromTokenAddress.address}&destinationChainId=${toChain}`
				);
				allowedData = await allowed.json();
				// console.log(allowedData, "dsa");
			} catch (e) {
				// console.log(e);
			}
			// console.log(allowedData);
			if (
				allowedData &&
				!(
					Number(allowedData.minDeposit) <= Number(amount) &&
					Number(amount) <= Number(allowedData.maxDeposit)
				)
			) {
				return fees;
			}
			// console.log("Across");

			const ACROSS_BASE_URL = "https://across.to/api/suggested-fees";
			try {
				const res = await fetch(
					`${ACROSS_BASE_URL}?token=${fromTokenAddress.address}&chainId=${fromChain}&destinationChainId=${toChain}&amount=${amount}`
				);
				if (res.status >= 400) throw "Error 404";
				const data = await res.json();

				try {
					const relayerPC = ethers.utils.formatUnits(
						data.relayFeePct,
						16
					);
					const lpPC = ethers.utils.formatUnits(data.lpFeePct, 16);

					const amountToGet = (
						Number(amount) -
						((Number(amount) * Number(relayerPC)) / 100 +
							(Number(amount) * Number(lpPC)) / 100)
					).toFixed(0);
					const transferFees = (
						Number(amount) - Number(amountToGet)
					).toFixed(0);

					// console.log(relayerPC, lpPC, amountToGet, transferFees);

					fees = {
						gasFees: ethers.utils.formatUnits(
							transferFees,
							fromTokenAddress.decimals
						),
						amountToGet: ethers.utils.formatUnits(
							amountToGet,
							fromTokenAddress.decimals
						),
						transferFee: ethers.utils.formatUnits(
							transferFees,
							fromTokenAddress.decimals
						),
						bridgeTime: "20",
						extraData: {
							relayerFees: data.relayFeePct,
							quoteTimestamp: data.timestamp
						}
					};
				} catch (e) {
					console.log("ACROSS ERROR 1");
					fees = {
						gasFees: "0",
						amountToGet: "0",
						transferFee: "0",
						bridgeTime: "15",
						extraData: {}
					};
				}
				// console.log(fees);
			} catch (e) {
				console.log("ACROSS ERROR");
			}

			return fees;
		},
	},
	{
		logoUri: "https://raw.githubusercontent.com/WagPay/aggregator-frontend/main/public/images/uTkJzemg_400x400.png?token=GHSAT0AAAAAABV7XCKKM4HEN5UJ235WZPC6YW2N3FA",
		name: BridgeId.Connext,
		contract: {
			1: "",
			137: "15",
		},
		supported_chains: [
			ChainId.ETH,
			ChainId.POL,
			ChainId.BSC,
			ChainId.AVA,
			ChainId.FTM,
			ChainId.OPT,
			ChainId.ARB,
			ChainId.MOO,
		],
		supported_coins: [
			CoinKey.USDT,
			CoinKey.USDC,
			CoinKey.DAI,
			CoinKey.WETH,
			CoinKey.WBTC,
		],
		getTransferFees: async (
			fromChain: ChainId,
			toChain: ChainId,
			fromToken: CoinKey,
			amount: string
		): Promise<FeesInterface> => {
			let tokenName = tokens[fromChain as number][fromToken].symbol;

			let fees: FeesInterface = {
				gasFees: "",
				amountToGet: "",
				transferFee: "",
				bridgeTime: "",
				extraData: {}
			};

			const fromTokenAddress = tokens[fromChain as number][fromToken];
			const toTokenAddress = tokens[toChain as number][fromToken];
			let allowed, allowedData;

			try {
				const CONNEXT_FEES = 0.05;
				const connext_fees = (
					(Number(amount) * CONNEXT_FEES) /
					100
				).toFixed(2);

				const amountReceived = (
					Number(amount) - Number(connext_fees)
				).toFixed(2);

				fees.amountToGet = ethers.utils.formatUnits(
					amountReceived.split(".")[0],
					fromTokenAddress.decimals
				);
				fees.bridgeTime = "20";
				fees.transferFee = connext_fees;
				fees.gasFees = "";
			} catch (e) {
				console.log(e, "E");
			}

			return fees;
		},
	},
];