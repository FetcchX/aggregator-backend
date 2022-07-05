import { Token } from "@wagpay/types";
import fetch from "cross-fetch";

class HyphenProvider {
	getTransferFees = async (
		fromChainId: number,
		toChainId: number,
		token: Token,
		amount: any
	) => {
		const HYPHEN_BASE_URL = "https://hyphen-v2-api.biconomy.io/api/v1";
		try {
			const res = await fetch(
				`${HYPHEN_BASE_URL}/data/transferFee?fromChainId=${fromChainId}&toChainId=${toChainId}&tokenAddress=${token.address}&amount=${amount}`
			);
			if (res.status >= 400) throw "Error 404";
			const data = await res.json();

			let fees = {
				gas: data["gasFee"],
				amountToGet: data["amountToGet"],
				transferFee: data["transferFee"],
				transferFeePerc: data["transferFeePercentage"],
			};

			return fees;
		} catch (e) {
			return e;
		}
	};
}

export default HyphenProvider;
