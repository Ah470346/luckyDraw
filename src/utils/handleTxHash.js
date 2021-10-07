import {ethers} from "ethers";

export const handleTxHash = (txData, account, battleContract) => {
    const {transactionHash, events, from} = txData
    let battleResult = null
    let expReward = null
    let reward = null
    let error = null
    if (!events) {
        if (txData.data && txData.data.message) {
            error = txData.data.message
        }
        return {
            transactionHash,
            battleResult,
            expReward,
            reward,
            error
        }
    }
    if (from.toLowerCase() !== account.toLowerCase()) {
        error = "Undefined error!!!"
        return {
            transactionHash,
            battleResult,
            expReward,
            reward,
            error
        }
    }

    let battleEvent = events.find((e) => e.topics[0] === "0x56ddf9794cdf48375bd1750eb64b7217ca0be0318436ce99ed878deea808d444")

    if (battleEvent) {
        let decodeBattleLog = battleContract.interface.decodeEventLog("BattleEvent", battleEvent.data)
        console.log('decode', decodeBattleLog)
        battleResult = decodeBattleLog.result
        expReward = ethers.BigNumber.from(decodeBattleLog.expresult).toString()
        reward = ethers.BigNumber.from(decodeBattleLog.rewardresult).toString()
    }

    return {
        transactionHash,
        battleResult,
        expReward,
        reward
    }
}