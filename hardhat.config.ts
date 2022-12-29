import "@typechain/hardhat";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-ethers";
import "hardhat-gas-reporter";
import "dotenv/config";
import "solidity-coverage";
import "hardhat-deploy";
import "solidity-coverage";
import { HardhatUserConfig } from "hardhat/config";

const LOCALHOST_RPC_URL =
    process.env.LOCALHOST_RPC_URL || "http://127.0.0.1:8545/";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "privateKey";

/** @type import('hardhat/config').HardhatUserConfig */
const config: HardhatUserConfig = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 31337,
            allowUnlimitedContractSize: true,
        },
        localhost: {
            chainId: 31337,
            url: LOCALHOST_RPC_URL,
            allowUnlimitedContractSize: true,
        },
    },
    solidity: {
        compilers: [
            { version: "0.8.7" },
            { version: "0.4.19" },
            { version: "0.6.12" },
            { version: "0.6.0" },
            { version: "0.8.9" },
        ],
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
        player: {
            default: 1,
        },
    },
    gasReporter: {
        enabled: true,
        currency: "USD",
    },
    mocha: {
        timeout: 300000,
    },
};

export default config;
