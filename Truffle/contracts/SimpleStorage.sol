// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.13;

contract SimpleStorage {
    uint256 storageData;

    function get() public view returns (uint256) {
        return storageData;
    }

    function set(uint256 n) public {
        storageData = n;
    }
}
