import {useCallback} from 'react';
import {useWallet} from 'use-wallet';
import {useLuckyDrawNFT} from "./hookContract";
import {contractAddress} from "../utils/contract";
import {useSigner} from "./hook";


export const useLKnftAction = () => {
    const signer = useSigner()
    const LKnftContract = useLuckyDrawNFT(signer)
    const {account} = useWallet()


    const getWave = useCallback(async () => {
        return await LKnftContract.getCurrentId();
    }, [LKnftContract]);

    const getReward = useCallback(async () => {
        return await LKnftContract.returnTotalReward();
    }, [LKnftContract]);


    const getResult = useCallback(async (wave) => {
        return await LKnftContract.returnMapRoundHistory(wave);
    }, [LKnftContract]);

    

    return {
        getResult:getResult,
        getWave:getWave,
        getReward:getReward
    }
}
