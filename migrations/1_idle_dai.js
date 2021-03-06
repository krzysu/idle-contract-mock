const IdleTokenV4Mock = artifacts.require("IdleTokenV4Mock");

module.exports = async function (deployer) {
  const name = "IdleV4Mock_DAI";
  const symbol = "IDLE_DAI_V4";
  const tokenAddress = "0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea"; // DAI rinkeby
  const price = "1001948397218901252";
  const avgApr = "2916640475735053124";

  await deployer.deploy(
    IdleTokenV4Mock,
    name,
    symbol,
    tokenAddress,
    price,
    avgApr
  );

  const instance = await IdleTokenV4Mock.deployed();
  const afterDeployTokenPrice = await instance.tokenPrice.call();
  const afterDeployGetAPR = await instance.getAvgAPR.call();

  console.log({
    tokenPrice: web3.utils.fromWei(afterDeployTokenPrice),
    getAPR: web3.utils.fromWei(afterDeployGetAPR),
  });
};
