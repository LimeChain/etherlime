// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.0;

import "./ECTools.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * Escrow_V2 is deprecated and currently it is not used in production 
 */
contract Escrow_V2_Test {
    using SafeMath for uint256;

    IERC20 public tokenContract;

    mapping (address => bool) public signers;
    mapping (uint256 => bool) public usedNonces;

    address payable public dAppAdmin;
    uint256 constant public REFUNDING_LOGIC_GAS_COST = 7901; // gas used for single refund 

    uint256 constant public FIAT_PAYMENT_FUND_FUNCTION_CALL_GAS_USED = 32231; // gas used for calling fundForFiatPayment
    uint256 constant public RELAYED_PAYMENT_FUND_FUNCTION_CALL_GAS_USED = 31564; // gas used for calling fundForRelayedPayment

    modifier onlyDAppAdmin() {
        require(msg.sender == dAppAdmin, "Unauthorized access"); 
        _;
    }

    modifier preValidateFund(uint256 nonce) {
        require(!usedNonces[nonce], "Nonce already used");
        _;
    }

    constructor(address tokenAddress, address payable _dAppAdmin) {
        dAppAdmin = _dAppAdmin;   
        tokenContract = IERC20(tokenAddress); 
    }
   
    function fundForRelayedPayment(uint256 nonce, address payable addressToFund, uint256 weiAmount, bytes memory authorizationSignature) public
    preValidateFund(nonce)
    {
        uint256 gasLimit = gasleft().add(RELAYED_PAYMENT_FUND_FUNCTION_CALL_GAS_USED);
        
        addressToFund.transfer(weiAmount);

        _refundMsgSender(gasLimit);
    }

    function fundForFiatPayment(uint256 nonce, address payable addressToFund, uint256 tokenAmount, uint256 weiAmount, bytes memory authorizationSignature) public
    preValidateFund(nonce)
    {
        uint256 gasLimit = gasleft().add(FIAT_PAYMENT_FUND_FUNCTION_CALL_GAS_USED);

        tokenContract.transfer(addressToFund, tokenAmount);
        addressToFund.transfer(weiAmount);

        _refundMsgSender(gasLimit);
    }

    function getSigner(bytes32 raw, bytes memory sig) public pure returns(address signer) {
        return ECTools.prefixedRecover(raw, sig);
    }

    function _refundMsgSender(uint256 gasLimit) internal {
        uint256 refundAmount = gasLimit.sub(gasleft()).add(REFUNDING_LOGIC_GAS_COST).mul(tx.gasprice);
        msg.sender.transfer(refundAmount);
    }
}