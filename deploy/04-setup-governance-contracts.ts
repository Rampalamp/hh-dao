import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/dist/types";
import { ethers } from "hardhat";
import { ADDRESS_ZERO } from "../helper-hardhat-config";

const setupContracts: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment
) {
    const { getNamedAccounts, deployments, network } = hre;
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const timeLock = await ethers.getContract("TimeLock", deployer);
    const governor = await ethers.getContract("GovernorContract", deployer);

    log("Setting up contracts...");

    const proposerRole = await timeLock.PROPOSER_ROLE();
    const executorRole = await timeLock.EXECUTOR_ROLE();
    const adminRole = await timeLock.TIMELOCK_ADMIN_ROLE();

    log("Granting Proposer Role...");
    const proposerTx = await timeLock.grantRole(proposerRole, governor.address);
    await proposerTx.wait(1);

    log("Granting Executor Role...");
    const executorTx = await timeLock.grantRole(executorRole, ADDRESS_ZERO);
    await executorTx.wait(1);

    log("Revoking Admin Role...");
    const revokeTx = await timeLock.revokeRole(adminRole, deployer);
    await revokeTx.wait(1);
};

export default setupContracts;

setupContracts.tags = ["all", "setup"];
