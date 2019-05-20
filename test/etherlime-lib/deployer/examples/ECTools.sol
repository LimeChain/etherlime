pragma solidity 0.5.1;

library ECTools {

  /**
   * @dev Recover signer address from a message by using his signature
   * @param originalMessage bytes32 message, the originalMessage is the signed message. What is recovered is the signer address.
   * @param signedMessage bytes signature
   */
    function recover(bytes32 originalMessage, bytes memory signedMessage) public pure returns (address) {
        bytes32 r;
        bytes32 s;
        uint8 v;

        //Check the signature length
        if (signedMessage.length != 65) {
            return (address(0));
        }

        // Divide the signature in r, s and v variables
        assembly {
            r := mload(add(signedMessage, 32))
            s := mload(add(signedMessage, 64))
            v := byte(0, mload(add(signedMessage, 96)))
        }

        // Version of signature should be 27 or 28, but 0 and 1 are also possible versions
        if (v < 27) {
            v += 27;
        }

        // If the version is correct return the signer address
        if (v != 27 && v != 28) {
            return (address(0));
        } else {
            return ecrecover(originalMessage, v, r, s);
        }
    }

    function toEthereumSignedMessage(bytes32 _msg) public pure returns (bytes32) {
        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        return keccak256(abi.encodePacked(prefix, _msg));
    }

    function prefixedRecover(bytes32 _msg, bytes memory sig) public pure returns (address) {
        bytes32 ethSignedMsg = toEthereumSignedMessage(_msg);
        return recover(ethSignedMsg, sig);
    }
}