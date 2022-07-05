export type chainsSupported = "1" | "137"
export type tokensSupported = "ETH" | "WETH" | "USDC" | "USDT" | "MATIC"

const tokens: any = {
	"1": {
		'0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee': {name:'ETH',address:'0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',decimals:18,chainId:1},
		'ETH': {name:'ETH',address:'0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',decimals:18,chainId:1},
		'0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2': {name:'WETH',address:'0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',decimals:18,chainId:1},
		'WETH': {name:'WETH',address:'0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',decimals:18,chainId:1},
		'0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48': {name:'USDC',address:'0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',decimals:6,chainId:1},
		'USDC': {name:'USDC',address:'0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',decimals:6,chainId:1},
		'0xdac17f958d2ee523a2206206994597c13d831ec7': {name:'USDT',address:'0xdac17f958d2ee523a2206206994597c13d831ec7',decimals:6,chainId:1},
		'USDT': {name:'USDT',address:'0xdac17f958d2ee523a2206206994597c13d831ec7',decimals:6,chainId:1},
		'MATIC': {name:'MATIC',address:'0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0',decimals:18,chainId:1},
		'0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0': {name:'MATIC',address:'0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0',decimals:18,chainId:1}
	},
	"137": {
		'0x7ceb23fd6bc0add59e62ac25578270cff1b9f619': {name:'ETH',address:'0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',decimals:18,chainId:137},
		'ETH': {name:'ETH',address:'0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',decimals:18,chainId:137},
		'0xc2132D05D31c914a87C6611C10748AEb04B58e8F': {name:'USDT',address:'0xc2132D05D31c914a87C6611C10748AEb04B58e8F',decimals:6,chainId:137},
		'USDT': {name:'USDT',address:'0xc2132D05D31c914a87C6611C10748AEb04B58e8F',decimals:6,chainId:137},
		'0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174': {name:'USDC',address:'0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',decimals:6,chainId:137},
		'USDC': {name:'USDC',address:'0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',decimals:6,chainId:137},
		'0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee': {name:'MATIC',address:'0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',decimals:18,chainId:137},
		'MATIC': {name:'MATIC',address:'0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',decimals:18,chainId:137}
	}
}

export default tokens