import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/dist/types";
import { ethers } from "hardhat";
import { MIN_DELAY, ADDRESS_ZERO } from "../helper-hardhat-config";

const deployTimeLock: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment
) {
    const { getNamedAccounts, deployments } = hre;
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    log("Deploying Time Lock...");
    //the admin param (last param), needs to be set to deployer, otherwise in the setup contracts deploy script
    //it won't have access to the grant/revoke functions of TimeLock contract.
    const timeLock = await deploy("TimeLock", {
        from: deployer,
        args: [MIN_DELAY, [], [], deployer],
        log: true,
        waitConfirmations: 1,
    });

    log(`Deployed TimeLock to address ${timeLock.address}`);
};

export default deployTimeLock;

deployTimeLock.tags = ["all", "timelock"];
