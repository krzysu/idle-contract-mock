pragma solidity 0.5.16;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

contract IdleTokenV3Mock is ERC20, ERC20Detailed {
  using SafeERC20 for IERC20;
  using SafeMath for uint256;

  address public token;
  uint256 public price;
  uint256 public avgApr;

  constructor(
    string memory _name,
    string memory _symbol,
    address _token,
    uint256 _price,
    uint256 _avgApr
  ) public ERC20Detailed(_name, _symbol, 18) {
    token = _token;
    price = _price;
    avgApr = _avgApr;
  }

  function mintIdleToken(uint256 _amount, bool _skipWholeRebalance)
    external
    returns (uint256 mintedTokens)
  {
    uint256 idlePrice = tokenPrice();
    IERC20(token).safeTransferFrom(msg.sender, address(this), _amount);

    mintedTokens = _amount.div(idlePrice);
    _mint(msg.sender, mintedTokens);
  }

  function redeemIdleToken(
    uint256 _amount,
    bool _skipRebalance,
    uint256[] calldata _clientProtocolAmounts
  ) external returns (uint256 redeemedTokens) {
    uint256 idlePrice = tokenPrice();
    redeemedTokens = _amount.mul(idlePrice);

    _burn(msg.sender, _amount);
    IERC20(token).safeTransfer(msg.sender, redeemedTokens);
  }

  function redeemInterestBearingTokens(uint256 _amount) external {
    uint256 idlePrice = tokenPrice();
    uint256 redeemedTokens = _amount.mul(idlePrice);

    _burn(msg.sender, _amount);
    IERC20(token).safeTransfer(msg.sender, redeemedTokens);
  }

  function rebalance() external returns (bool) {
    return true;
  }

  function rebalanceWithGST() external returns (bool) {
    return true;
  }

  function openRebalance(uint256[] calldata _newAllocations)
    external
    returns (bool, uint256)
  {
    uint256 newAprAfterRebalance = getAvgAPR();
    return (true, newAprAfterRebalance);
  }

  function tokenPrice() public view returns (uint256) {
    return price;
  }

  function getAPRs()
    external
    view
    returns (address[] memory addresses, uint256[] memory aprs)
  {
    addresses = new address[](0);
    aprs = new uint256[](0);
  }

  function getAvgAPR() public view returns (uint256) {
    return avgApr;
  }

  function getCurrentAllocations()
    external
    view
    returns (
      address[] memory tokenAddresses,
      uint256[] memory amounts,
      uint256 total
    )
  {
    tokenAddresses = new address[](0);
    amounts = new uint256[](0);
    total = (1 * 10) ^ 18;

    return (tokenAddresses, amounts, total);
  }
}
