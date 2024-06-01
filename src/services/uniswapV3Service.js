import { Contract } from 'ethers';
import provider from './provider';
import exchanges from '../config/exchanges.json';

const UNISWAP_V3_FACTORY_ABI = [
  'function getPool(address tokenA, address tokenB, uint24 fee) external view returns (address pool)'
];

const UNISWAP_V3_POOL_ABI = [
  'function slot0() external view returns (uint160 sqrtPriceX96, int24 tick, uint16 observationIndex, uint16 observationCardinality, uint16 observationCardinalityNext, uint8 feeProtocol, bool unlocked)',
  'function liquidity() external view returns (uint128)'
];

const sanitizeAddress = (address) => address.trim();

export const getPools = async (baseToken, pairToken, exchange, fee = 3000) => {
  const sanitizedBaseToken = sanitizeAddress(baseToken);
  const sanitizedPairToken = sanitizeAddress(pairToken);

  try {
    const factoryAddress = exchanges[exchange];
    if (!factoryAddress) {
      throw new Error(`Unknown exchange: ${exchange}`);
    }

    const factoryContract = new Contract(factoryAddress, UNISWAP_V3_FACTORY_ABI, provider);
    const poolAddress = await factoryContract.getPool(sanitizedBaseToken, sanitizedPairToken, fee);

    if (poolAddress !== '0x0000000000000000000000000000000000000000') {
      const poolContract = new Contract(poolAddress, UNISWAP_V3_POOL_ABI, provider);
      const slot0 = await poolContract.slot0();
      const liquidity = await poolContract.liquidity();
      return {
        poolAddress,
        sqrtPriceX96: slot0.sqrtPriceX96.toString(),
        liquidity: liquidity.toString(),
      };
    } else {
      console.warn(`Pool address is zero for ${baseToken} - ${pairToken} on ${exchange}`);
    }
  } catch (error) {
    console.error(`Error fetching pool for ${baseToken} - ${pairToken} on ${exchange}:`, error);
  }

  return null;
};
