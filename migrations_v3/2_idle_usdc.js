const IdleTokenV3Mock = artifacts.require("IdleTokenV3Mock");

module.exports = async function(deployer) {
  const name = "IdleV3Mock_USDC";
  const symbol = "IDLE_USDC";
  const tokenAddress = "0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b"; // USDC rinkeby
  const price = "1002332";
  const avgApr = "3520182976637608225";

  await deployer.deploy(
    IdleTokenV3Mock,
    name,
    symbol,
    tokenAddress,
    price,
    avgApr
  );

  const instance = await IdleTokenV3Mock.deployed();
  const afterDeployTokenPrice = await instance.tokenPrice.call();
  const afterDeployGetAPR = await instance.getAvgAPR.call();

  console.log({
    tokenPrice: web3.utils.fromWei(afterDeployTokenPrice, "lovelace"),
    getAPR: web3.utils.fromWei(afterDeployGetAPR),
  });
};
