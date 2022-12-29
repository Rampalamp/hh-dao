import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/dist/types";
import { networkConfig } from "../helper-hardhat-config";
import { ethers } from "hardhat";

const deployBox: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment
) {
    const { getNamedAccounts, deployments, network } = hre;
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    log("Deploying Box...");

    const box = await deploy("Box", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
    });

    const timeLock = await ethers.getContract("TimeLock");

    const boxContract = await ethers.getContractAt("Box", box.address);

    const transferOwnerTx = await boxContract.transferOwnership(
        timeLock.address
    );
    await transferOwnerTx.wait(1);

    log("Finished transfering");
};

export default deployBox;

deployBox.tags = ["all", "box"];
