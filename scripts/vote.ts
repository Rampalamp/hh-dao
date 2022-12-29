import {
    developmentChains,
    proposalsFile,
    VOTING_PERIOD,
} from "../helper-hardhat-config";
import * as fs from "fs";
import { ethers, network } from "hardhat";
import { moveBlock } from "../utils/move-blocks";

const index = 0;

async function main(proposalIndex: number) {
    const proposals = JSON.parse(fs.readFileSync(proposalsFile, "utf8"));
    const proposalId = proposals[network.config.chainId!][proposalIndex];
    //0 = against, 1 = for, 2= abstain

    const voteWay = 1;
    const governor = await ethers.getContract("GovernorContract");
    const reason = "Cause I Wanted to!";
    const voteTxResponse = await governor.castVoteWithReason(
        proposalId,
        voteWay,
        reason
    );

    await voteTxResponse.wait(1);
    //at this point can check various state of the vote/proposal state.

    if (developmentChains.includes(network.name)) {
        await moveBlock(VOTING_PERIOD + 1);
    }

    console.log("Voted!");
}

main(index)
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
