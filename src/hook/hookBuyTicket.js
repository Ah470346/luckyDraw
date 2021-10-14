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

    const openSeed = useCallback(async (amount) => {
        return openBoxContract.openSeed(amount)
    }, [openBoxContract])

    return {
        openBoxContract: openBoxContract,
        getTicketPrice: getTicketPrice,
        buyTicket: buyTicket,
        openSeed: openSeed,
    }
}
