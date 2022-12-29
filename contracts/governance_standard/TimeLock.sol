// SPDX-License-Identifier: MIT

//We want to wait for a new vote to be "executed"

//Everyone who holds the GovernanceToken has to pay 5 tokens

//Give time to users to "get out" if they don't like a governance update

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/governance/TimelockController.sol";

contract TimeLock is TimelockController {
    /**
     * @notice Constuctor for timelock
     * @param minDelay: How long you have to wait before executing
     * @param proposers: list of addresses that can propose
     * @param executors: list of addresses that can execute when a proposal passes
     * @param admin: optional account to be granted admin role; disable with zero address
     */
    constructor(
        uint256 minDelay,
        address[] memory proposers,
        address[] memory executors,
        address admin
    ) TimelockController(minDelay, proposers, executors, admin) {}
}
