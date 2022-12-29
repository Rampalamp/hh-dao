import { network } from "hardhat";

export async function moveBlock(amount: number) {
    console.log(`Moving ${amount} blocks....`);

    for (let index = 0; index < amount; index++) {
        await network.provider.request({ method: "evm_mine", params: [] });
    }
}
