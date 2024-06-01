import { Contract } from 'ethers';
import provider from './provider';
import exchanges from '../config/exchanges.json';

const UNISWAP_FACTORY_ABI = [
  'function getPair(address tokenA, address tokenB) external view returns (address pair)'
];

const UNISWAP_PAIR_ABI = [
  'function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)'
];

const sanitizeAddress = (address) => address.trim();

export const getPairs = async (baseToken, pairToken, exchange) => {
  const sanitizedBaseToken = sanitizeAddress(baseToken);
  const sanitizedPairToken = sanitizeAddress(pairToken);

  try {
    const factoryAddress = exchanges[exchange];
    if (!factoryAddress) {
      throw new Error(`Unknown exchange: ${exchange}`);
    }

    const factoryContract = new Contract(factoryAddress, UNISWAP_FACTORY_ABI, provider);
    const pairAddress = await factoryContract.getPair(sanitizedBaseToken, sanitizedPairToken);

    if (pairAddress !== '0x0000000000000000000000000000000000000000') {
      const pairContract = new Contract(pairAddress, UNISWAP_PAIR_ABI, provider);
      const reserves = await pairContract.getReserves();
      return {
        pairAddress,
        reserve0: reserves.reserve0.toString(),
        reserve1: reserves.reserve1.toString(),
      };
    } else {
      console.warn(`Pair address is zero for ${baseToken} - ${pairToken} on ${exchange}`);
    }
  } catch (error) {
    console.error(`Error fetching pair for ${baseToken} - ${pairToken} on ${exchange}:`, error);
  }

  return null;
};
