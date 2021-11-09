import {useCallback} from 'react';
import {useWallet} from 'use-wallet';
import {useNFTcontract} from "./hookContract";
import {contractAddress} from "../utils/contract";
import {useSigner} from "./hook";


export const useNFTaction = () => {
    const signer = useSigner()
    const nftContract = useNFTcontract(signer)
    const {account} = useWallet()
    const getNftInfo = useCallback(async (idToken) => {
        return await nftContract.getCoopa(idToken)
    }, [nftContract])

    const transferFrom = useCallback(async (from, to, tokenId) => {
        return await nftContract.transferFrom(from, to, tokenId)
    }, [nftContract])

    const isApprove = useCallback(async ()=> {
        return await nftContract.isApprovedForAll(account, contractAddress.market)
            .then(res=> {
                    return res
            })
    })

    const approve = useCallback(async (tokenId)=> {
        return await nftContract.setApprovalForAll(contractAddress.market, true)
    }, [nftContract, signer])


    const getLsTicketIdByAddress = useCallback(async (address)=> {
     return await nftContract.addrTicketBatch(address)
    }, [nftContract])






    const returnTotalrewardId = useCallback(async (currentId)=> {
     return await nftContract.returnTotalrewardId(currentId)
    }, [nftContract])






    const returnCountReward = useCallback(async (currentId)=> {
     return await nftContract.returnCountReward(currentId)
    }, [nftContract])

    const checkDrawNow = useCallback(async ()=> {
     return await nftContract.checkDrawNow()
    }, [nftContract])


    return {
        nftContract: nftContract,
        getNftInfo: getNftInfo,
        approve:approve,
        isApprove:isApprove,
        transferFrom:transferFrom,

        getLsTicketIdByAddress:getLsTicketIdByAddress,

        // returnDatetimeId:returnDatetimeId,
        // returnTotalrewardId:returnTotalrewardId,

        returnCountReward:returnCountReward,
        checkDrawNow:checkDrawNow
    }
}
