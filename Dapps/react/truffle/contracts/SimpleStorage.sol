// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract SimpleStorage {
    uint256 value;
    string greeter;

    event valueChanged(uint256 _val);

    function read() public view returns (uint256) {
        return value;
    }

    function greet() external view returns (string memory) {
        return greeter;
    }

    function setGreet(string memory _greeter) external {
        greeter = _greeter;
    }

    function write(uint256 newValue) public {
        require(newValue != 5, "error msg");
        value = newValue;
        emit valueChanged(newValue);
    }
}
