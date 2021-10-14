import {ethers} from "ethers";

export const handleTxHash = (txData, account, buyTicketContract) => {
    const {transactionHash, events, from} = txData
    let buyTicketResult = null
    let error = null
    if (!events) {
        if (txData.data && txData.data.message) {
            error = txData.data.message
        }
        return {
            transactionHash,
            buyTicketResult,
            error
        }
    }
    if (from.toLowerCase() !== account.toLowerCase()) {
        error = "Undefined error!!!"
        return {
            transactionHash,
            buyTicketResult,
            error
        }
    }

    let buyTicketEvent = events.find((e) => e.topics[0] === "0x2a3164428cba5dad15f5ffe47e10cbefdcbbe9e269fd482753982ee8b2648c3e")

    if (buyTicketEvent) {
        let decodeBuyTicketLog = buyTicketContract.interface.decodeEventLog("BuyTicket", buyTicketEvent.data)
        buyTicketResult = decodeBuyTicketLog.result
    }

    return {
        transactionHash,
        buyTicketResult,
    }
}