const IdleTokenV3Mock = artifacts.require("IdleTokenV3Mock");

module.exports = async function(deployer) {
  const name = "IdleV3Mock_TestnetDAI";
  const symbol = "IDLE_TESTNETDAI";
  const tokenAddress = "0xc3dbf84Abb494ce5199D5d4D815b10EC29529ff8"; // TestnetDAI rinkeby
  const price = "1001948397218901252";
  const avgApr = "3793037708668983403";

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
    tokenPrice: web3.utils.fromWei(afterDeployTokenPrice),
    getAPR: web3.utils.fromWei(afterDeployGetAPR),
  });
};
