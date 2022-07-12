import route from "@shared/routes";
import {
	Token,
	AllowDenyPrefer,
	ChainId,
	tokens,
	chainsSupported,
	UniswapData,
	RouteResponse,
	Routes,
	CoinKey,
	coinEnum,
} from "@wagpay/types";
import { ethers } from "ethers";
import UniswapProvider from "./dexes/UniswapProvider";
import { bridges, Dex, dexes } from "@shared/config";

const uniswap = new UniswapProvider();

interface AlgoOptimize {
	gas?: boolean;
	time?: boolean;
	return?: boolean;
}

class Bridges {
	getRoutes = (fromChain: string, fromToken: Token, toChain: string): any => {
		const routes =
			route.available_routes[fromChain][fromToken.name][toChain];

		if (!routes) {
			throw "No Route Found";
		}
		return routes;
	};

	bestBridgeV2 = async (
		fromChain: ChainId,
		toChain: ChainId,
		fromToken: CoinKey,
		toToken: CoinKey,
		amount: string,
		bridge?: AllowDenyPrefer,
		dex?: AllowDenyPrefer,
		optimize?: AlgoOptimize
	) => {
		const supported_bridges = bridges.filter(
			(bridge) =>
				bridge.supported_chains.includes(fromChain) &&
				bridge.supported_chains.includes(toChain) &&
				bridge.supported_coins.includes(toToken)
		);
		const supported_dexes = dexes.filter(
			(dex) =>
				dex.supported_chains.includes(fromChain) &&
				dex.supported_coins.includes(fromToken) &&
				dex.supported_coins.includes(toToken)
		);

		const uniswapRequired = fromToken !== toToken;

		if (uniswapRequired) {
			if (!supported_dexes) {
				throw `Dex does not support chain ${fromChain} for ${fromToken} -> ${toToken}`;
			}
		}

		const routes: Routes[] = [];
		const promises: any[] = [];
		let uniswapData = {};

		if (uniswapRequired) {
			// console.log(supported_dexes);
			for (let j = 0; j < supported_dexes.length; j++) {
				// console.log(
				// 	amount,
				// 	tokens[fromChain as number][fromToken.toString()],
				// 	tokens[fromChain as number][toToken.toString()]
				// );
				const uniswapRoute = await uniswap.getUniswapRoute(
					tokens[fromChain as number][fromToken.toString()],
					tokens[fromChain as number][toToken.toString()],
					Number(
						ethers.utils
							.formatUnits(
								amount.trim(),
								tokens[fromChain as number][
									fromToken.toString()
								].decimals
							)
							.toString()
					)
				);
				uniswapData = uniswapRoute;
			}
		}

		for (let i = 0; i < supported_bridges.length; i++) {
			const bridge = supported_bridges[i];
			let route: Routes = {
				name: bridge.name,
				bridgeTime: "",
				contractAddress: bridge.contract[fromChain as number],
				amountToGet: "",
				transferFee: "",
				uniswapData: uniswapData as UniswapData,
				route: {} as RouteResponse,
			};

			route.route = {
				fromChain: fromChain.toString(),
				toChain: toChain.toString(),
				fromToken: tokens[fromChain as number][fromToken.toString()],
				toToken: tokens[toChain as number][toToken.toString()],
				amount: amount,
			};

			const toToken2 = uniswapRequired ? toToken : fromToken;
			const toTToken2 = tokens[Number(fromChain)][toToken2];
			// console.log(route.uniswapData, "amoun");
			promises.push(
				bridge
					.getTransferFees(
						fromChain,
						toChain,
						toToken2,
						uniswapRequired
							? ethers.utils
								.parseUnits(
									route.uniswapData.amountToGet.toFixed(
										2
									),
									toTToken2.decimals
								)
								.toString()
							: amount
					)
					.then((fees) => {
						route.amountToGet = fees.amountToGet;
						route.transferFee = fees.transferFee;

						routes.push(route);
					})
			);

			// routes.push(route)
		}

		await Promise.all(promises);

		if (optimize) {
			// console.log(
			// 	"Dsadsaasd",
			// 	optimize,
			// 	routes.map((route) => [route.name, route.amountToGet])
			// );
			let sorted: Array<Routes> = routes
				.slice()
				.sort((x: any, y: any) => {
					if (
						optimize.return &&
						Number(x.amountToGet) < Number(y.amountToGet)
					) {
						return 1;
					} else if (
						optimize.gas &&
						Number(x.transferFee) < Number(y.transferFee)
					) {
						return 1;
					} else if (
						optimize.time &&
						Number(x.bridgeTime) < Number(y.bridgeTime)
					) {
						return 1;
					} else {
						return -1;
					}
				});
			// console.log(
			// 	"Dsadsaasd",
			// 	sorted.map((route) => [route.name, route.amountToGet])
			// );

			sorted = sorted.filter((x: Routes, index: number) => {
				if (!x.amountToGet || Number(x.amountToGet) <= 0) {
					return false;
				} else {
					return true;
				}
			});

			if (bridge) {
				for (let i = 0; i < sorted.length; i++) {
					// console.log(sorted.length, routes.length);
					if (
						bridge?.prefer?.includes(sorted[i].name.toLowerCase())
					) {
						const sort = sorted[i];
						sorted.splice(i, 1);
						sorted.unshift(sort);
					} else if (
						bridge?.deny?.includes(sorted[i].name.toLowerCase())
					) {
						sorted.splice(i, 1);
					}
				}
			}

			return sorted;
		} else {
			let sorted: Array<any> = routes.slice().sort((x: any, y: any) => {
				if (Number(x.amountToGet) < Number(y.amountToGet)) {
					return 1;
				} else {
					return -1;
				}
			});

			sorted = sorted.filter((x: Routes, index: number) => {
				if (!x.amountToGet || Number(x.amountToGet) <= 0) {
					return false;
				} else {
					return true;
				}
			});

			if (bridge) {
				for (let i = 0; i < sorted.length; i++) {
					// console.log(sorted.length, routes.length);
					if (
						bridge?.prefer?.includes(sorted[i].name.toLowerCase())
					) {
						const sort = sorted[i];
						sorted.splice(i, 1);
						sorted.unshift(sort);
					} else if (
						bridge?.deny?.includes(sorted[i].name.toLowerCase())
					) {
						sorted.splice(i, 1);
					}
				}
			}

			return sorted;
		}
	};

	bestDex = async (
		fromChain: ChainId,
		fromToken: CoinKey,
		toToken: CoinKey,
		amount: string
	) => {
		return new Promise(async (resolve, reject) => {
			try {
				let list = []

				const supported_dexes = dexes.filter(dex => (dex.supported_chains.includes(fromChain) && (dex.supported_coins.includes(fromToken) && dex.supported_coins.includes(toToken))))

				for (let i = 0; i < supported_dexes.length; i++) {
					const dex = supported_dexes[i]

					const fees = await dex.getTransferFees(
						fromChain,
						fromToken,
						toToken,
						Number(amount)
					)

					list.push(fees)
				}

				resolve(list)
			} catch (e) {
				console.error(e)
				reject(e)
			}
		})
	}
}

export default Bridges;
