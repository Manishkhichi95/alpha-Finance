import { gql } from "apollo-angular";
debugger;
const GET_POSTS = gql`query {
  reserveParamsHistoryItems{
  utilizationRate,reserve{
    underlyingAsset,
    borrowCap,
    totalSupplies,
  },timestamp,
    availableLiquidity,
    variableBorrowRate,
    totalLiquidity,
    liquidityRate
      }
}
    `
export { GET_POSTS };