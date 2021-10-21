import {useBuyTicketcontract} from "./hookContract";
import {useCallback} from 'react'
import {useSigner} from "./hook";

export const useBuyTicketAction = () => {
    const signer = useSigner()
    const openBoxContract = useBuyTicketcontract(signer)

    const getTicketPrice = useCallback(async () => {
        return openBoxContract.ticketprice()
    }, [openBoxContract])

    const buyTicket = useCallback(async (lsTicket) => {
        return openBoxContract.buyTicket(lsTicket)
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

    return {
        openBoxContract: openBoxContract,
        getTicketPrice: getTicketPrice,
        buyTicket: buyTicket,
        openSeed: openSeed,
        claimToken:claimToken,
        getHistoryList:getHistoryList,
        checkReward:checkReward,
        claimReward:claimReward
    }
}
