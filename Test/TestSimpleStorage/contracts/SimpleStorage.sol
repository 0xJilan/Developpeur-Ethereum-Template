// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.13;

contract SimpleStorage {
    uint256 storageData;

    event storageRegistered(address setterAddress, uint256 amountSet);

    modifier isNotZero(uint256 numberToTest) {
        require(numberToTest != 0, "stored data cant be 0!");
        _;
    }

    function get() public view returns (uint256) {
        return storageData;
    }

    function set(uint256 n) public isNotZero(n) {
        storageData = n;
        emit storageRegistered(msg.sender, n);
    }
}
