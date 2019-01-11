pragma solidity 0.5.1;

import "./MerkleUtils.sol";

contract MerkleLime {

	bytes32 public limeRoot;

	constructor(bytes32 merkleRoot) public {
		limeRoot = merkleRoot;
	}

	function verifyDataInState(bytes memory data, bytes32[] memory nodes, uint leafIndex) view public returns(bool) {
		return MerkleUtils.containedInTree(limeRoot, data, nodes, leafIndex);
	}

    
}