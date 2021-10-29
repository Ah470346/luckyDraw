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

    const XoSo = useCallback(async () => {
        return await LKContract.drawnLoto();
    }, [LKContract]);


    const getCurrentTime = useCallback(async () => {
        return await LKContract.returnBlocktime();
    }, [LKContract]);


    const checkReward = useCallback(async (addr) => {
        return await LKContract.checkReward(addr);
    }, [LKContract]);

    const claimReward = useCallback(async () => {
        return await LKContract.claimReward();
    }, [LKContract]);

    const resetTime = useCallback(async () => {
        return await LKContract.resetDrawTime();
    }, [LKContract]);

    const getHistory = useCallback(async (wave) => {
        return await LKContract.returnMapAddressEachId(wave);
    }, [LKContract]);

    return {
        getHistory:getHistory,
        resetTime:resetTime,
        checkReward:checkReward,
        claimReward:claimReward,
        getCurrentTime:getCurrentTime,
        XoSo:XoSo,
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
