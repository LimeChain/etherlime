pragma solidity ^0.6.0;

import "./ECTools.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

/**
 * Escrow_V2 is deprecated and currently it is not used in production 
 */
contract Escrow_V2_Test {
    using SafeMath for uint256;

    ERC20 public tokenContract;

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

    constructor(address tokenAddress, address payable _dAppAdmin) public {
        dAppAdmin = _dAppAdmin;   
        tokenContract = ERC20(tokenAddress); 
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