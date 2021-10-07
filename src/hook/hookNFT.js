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

    const getCountCoopaOfAddress = useCallback(async (address) => {
        return await nftContract.balanceOf(address)
    }, [nftContract])

    const getTokenOfOwnerByIndex = useCallback(async (address,index) => {
        return await nftContract.tokenOfOwnerByIndex(address,index)
    }, [nftContract])

    const getCoopa = useCallback(async (tokenId) => {
        return await nftContract.getCoopa(tokenId)
    }, [nftContract])

    const getCoopaLevel = useCallback(async (tokenId) => {
        return await nftContract.coopaLevel(tokenId)
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

    return {
        nftContract: nftContract,
        getNftInfo: getNftInfo,
        getCountCoopaOfAddress:getCountCoopaOfAddress,
        getTokenOfOwnerByIndex:getTokenOfOwnerByIndex,
        getCoopa:getCoopa,
        approve:approve,
        isApprove:isApprove,
        transferFrom:transferFrom,
        getCoopaLevel:getCoopaLevel
    }
}
