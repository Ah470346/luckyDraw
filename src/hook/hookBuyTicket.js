import {useBuyTicketcontract} from "./hookContract";
import {useCallback} from 'react'
import {useSigner} from "./hook";

export const useBuyTicketAction = () => {
    const signer = useSigner()
    const openBoxContract = useBuyTicketcontract(signer)

    const getTicketPrice = useCallback(async () => {
        return openBoxContract.ticketprice()
    }, [openBoxContract])

    const buyTicket = useCallback(async (lsTicket,address) => {
        return openBoxContract.buyTicket(lsTicket,address)
    }, [openBoxContract])

    const claimToken = useCallback(async () => {
        return openBoxContract.claimToken()
    }, [openBoxContract])


    const openSeed = useCallback(async (amount) => {
        return openBoxContract.openSeed(amount)
    }, [openBoxContract])

    const getHistoryList = useCallback(async (address) => {
        return openBoxContract.getHistoryList(address)
    }, [openBoxContract])

    const checkReward = useCallback(async (address) => {
        return openBoxContract.checkReward(address)
    }, [openBoxContract])

    const claimReward = useCallback(async () => {
        return openBoxContract.claimReward()
    }, [openBoxContract])

    const drawnLoto = useCallback(async () => {
        return openBoxContract.drawnLoto()
    }, [openBoxContract])

    const returnBlockTime = useCallback(async () => {
        return openBoxContract.returnBlockTime()
    }, [openBoxContract])

    const returnListDrawHours = useCallback(async () => {
        return openBoxContract.returnListDrawHours()
    }, [openBoxContract])

    return {
        openBoxContract: openBoxContract,
        getTicketPrice: getTicketPrice,
        buyTicket: buyTicket,
        openSeed: openSeed,
        claimToken:claimToken,
        getHistoryList:getHistoryList,
        checkReward:checkReward,
        claimReward:claimReward,
        drawnLoto:drawnLoto,
        returnBlockTime:returnBlockTime,
        getTimeDraw:returnListDrawHours
    }
}
