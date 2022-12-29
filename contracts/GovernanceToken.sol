// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

//to prevent people from loading up on tokens right before a proposal, the DAO will take a snapshot of token holders from the past
//thus deterring people from loading up pre proposal and dumping after said proposal.
contract GovernanceToken is ERC20Votes {
    //million tokens
    uint256 public s_maxSupply = 1000000000000000000000000;

    constructor()
        ERC20("GovernanceToken", "GT")
        ERC20Permit("GovernanceToken")
    {
        _mint(msg.sender, s_maxSupply);
    }

    //overrides required by solidity.

    function _afterTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override(ERC20Votes) {
        super._afterTokenTransfer(from, to, amount);
    }

    function _mint(address to, uint256 amount) internal override(ERC20Votes) {
        super._mint(to, amount);
    }

    function _burn(
        address account,
        uint256 amount
    ) internal override(ERC20Votes) {
        super._burn(account, amount);
    }
}
