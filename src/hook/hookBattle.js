import {useCallback} from 'react'
import {useBattlecontract} from "./hookContract";
import {useSigner} from "./hook";


export const useBattleAction = () => {
    const signer = useSigner()
    const battleContract = useBattlecontract(signer)

    const battle = useCallback(async (idToken,coopaLvl) => {
        return await battleContract.battle(idToken,coopaLvl)
    }, [battleContract])

    const getTurn = useCallback(async (idToken) => {
        return await battleContract.getBonusMainTurn(idToken)
    }, [battleContract])



    const ownerPendingReward = useCallback(async (idToken) => {
        return await battleContract.ownerPendingReward(idToken)
    }, [battleContract])

    const claimToken = useCallback(async () => {
        return await battleContract.claimToken()
    }, [battleContract])

    const getExp = useCallback(async (idToken) => {
        return await battleContract.getExp(idToken)
    }, [battleContract])

    const lastBattleTime = useCallback(async (idToken) => {
        return await battleContract.lastBattleTime(idToken)
    }, [battleContract])

    const getLastClaim = useCallback(async (account) => {
        return await battleContract.timeAddressReward(account)
    }, [battleContract])

    const getCoopaCooldown = useCallback(async (account) => {
        return await battleContract.getCoopaCooldown(account)
    }, [battleContract])


    return {
        battleContract: battleContract,
        battle:battle,
        getTurn:getTurn,
        ownerPendingReward:ownerPendingReward,
        getExp:getExp,
        claimToken:claimToken,
        lastBattleTime:lastBattleTime,
        getLastClaim:getLastClaim,
        getCoopaCooldown:getCoopaCooldown
    }
}
