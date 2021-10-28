import {useCallback} from 'react';
import {useWallet} from 'use-wallet';
import {useNFTcontract,useLuckyDraw} from "./hookContract";
import {contractAddress} from "../utils/contract";
import {useSigner} from "./hook";


export const useLKaction = () => {
    const signer = useSigner()
    const LKContract = useLuckyDraw(signer)
    const {account} = useWallet()
    
    
    
    const getPriceTicket = useCallback(async () => {
        return await LKContract.getTicketPrice();
    }, [LKContract]);


    const buyTicket = useCallback(async (number) => {
        return await LKContract.playLuckyDraw(number);
    }, [LKContract]);

    const getTotalPlayers = useCallback(async () => {
        return await LKContract.returnTotalPlayer()
    }, [LKContract]);

    const getTotalTickets = useCallback(async () => {
        return await LKContract.returnTotalTicket()
    }, [LKContract]);

    const getMyTicket = useCallback(async (id) => {
        return await LKContract.returnMapAddressEachId(id);
    }, [LKContract]);

    const getTime = useCallback(async (id) => {
        return await LKContract.returnBlocktime();
    }, [LKContract]);


    const getLastTime = useCallback(async () => {
        return await LKContract.returnlastDrawTime();
    }, [LKContract]);

    const getRequireTime = useCallback(async () => {
        return await LKContract.returntimeDraw();
    }, [LKContract]);

    return {
        getLastTime:getLastTime,
        getRequireTime:getRequireTime,
        getTime:getTime,
        getMyTicket:getMyTicket,
        buyTicket:buyTicket,
        getPriceTicket:getPriceTicket,
        getTotalPlayers:getTotalPlayers,
        getTotalTickets:getTotalTickets
    }
}
