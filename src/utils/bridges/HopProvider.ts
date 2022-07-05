import { Chain, Hop } from "@hop-protocol/sdk";
import tokens from "@shared/tokens";
import { Token } from "@wagpay/types";
import { ethers } from "ethers";

class HopProvider {
	hopChains: any = {};

	constructor() {
		this.hopChains = {
			1: Chain.Ethereum,
			137: Chain.Polygon,
		};
	}

	getTransferFees = async (
		fromChainId: number,
		toChainId: number,
		token: Token,
		amount: any
	) => {
		return new Promise(async (resolve, reject) => {
			const signer = ethers.Wallet.createRandom();

			try {
				const hop = new Hop("mainnet");
				const bridge = hop.connect(signer).bridge(token.name);

				const fromChain = this.hopChains[fromChainId];
				const toChain = this.hopChains[toChainId];

				let sendData: any = await bridge.getSendData(
					amount,
					fromChain,
					toChain
				);
				const keys = Object.keys(sendData);

				for (let i = 0; i < keys.length; i++) {
					if (typeof sendData[keys[i]] == "object") {
						sendData[keys[i]] = sendData[keys[i]].toString();
					}
				}

				// console.log(sendData["estimatedReceived"], token)

				let fees = {
					gas: 0,
					amountToGet: ethers.utils.formatUnits(
						sendData["estimatedReceived"],
						token.decimals
					),
					transferFee: ethers.utils.formatUnits(
						sendData["adjustedBonderFee"],
						token.decimals
					),
				};

				console.log(fees, "das");

				resolve(fees);
			} catch (e) {
				reject(e);
			}
		});
	};
}

export default HopProvider;
