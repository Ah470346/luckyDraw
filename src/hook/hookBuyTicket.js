import {useBuyTicketcontract} from "./hookContract";
import {useCallback} from 'react'
import {useSigner} from "./hook";

export const useBuyTicketAction = () => {
    const signer = useSigner()
    const openBoxContract = useBuyTicketcontract(signer)

    const getTicketPrice = useCallback(async () => {
        return openBoxContract.getTicketPrice()
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

    const setTimeDraw = useCallback(async (arr) => {
        return openBoxContract.setTimeDraw(arr)
    }, [openBoxContract])

    const getLastDraw = useCallback(async () => {
        return openBoxContract.getLastDraw()
    }, [openBoxContract])


    const returnTotalReward = useCallback(async ()=> {
     return await openBoxContract.totalReward()
    }, [openBoxContract])

    const returnNumberId = useCallback(async (currentId)=> {
     return await openBoxContract.returnNumberId(currentId)
    }, [openBoxContract])

    const getCurrentDraw = useCallback(async ()=> {
     return await openBoxContract.getCurrentId()
    }, [openBoxContract])

    const getCurrentResult = useCallback(async (address,currentId)=> {
     return await openBoxContract.returnTicketOfAddressInBatch(currentId,address)
    }, [openBoxContract])

    const returnTotalAddress = useCallback(async (currentId)=> {
     return await openBoxContract.returnTotalAddress(currentId)
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
        getTimeDraw:returnListDrawHours,
        setTimeDraw:setTimeDraw,
        getLastDraw:getLastDraw,


        returnTotalReward:returnTotalReward,
        returnNumberId:returnNumberId,
        getCurrentDraw:getCurrentDraw,
        getCurrentResult:getCurrentResult,
        returnTotalAddress:returnTotalAddress
    }
}
