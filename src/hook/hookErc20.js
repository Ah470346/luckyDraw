import {useCoopaToken} from "./hookContract";
import {useCallback} from 'react';
import {useWallet} from "use-wallet";
import {contractAddress} from "../utils/contract";
import {BigNumber} from "ethers";
import {useSigner} from "./hook";

export const useERC20Action = () => {
    const signer = useSigner()
    const coopaERC20Contract = useCoopaToken(signer)
    const {account} = useWallet()

    const isApprove = useCallback(async ()=> {
        return await coopaERC20Contract.allowance(account, contractAddress.buyTicket)
            .then(res=> {
                if(res < BigNumber.from(10).pow(30)){
                    return false
                }
                return true
            })
    })

    const isApproveLK = useCallback(async ()=> {
        return await coopaERC20Contract.allowance(account, contractAddress.LK)
            .then(res=> {
                if(res < BigNumber.from(10).pow(30)){
                    return false
                }
                return true
            })
    })

    const approve = useCallback(async ()=> {
        return await coopaERC20Contract.approve(contractAddress.buyTicket, BigNumber.from(10).pow(60))
    }, [coopaERC20Contract, signer])

    const approveLK = useCallback(async ()=> {
        return await coopaERC20Contract.approve(contractAddress.LK, BigNumber.from(10).pow(60))
    }, [coopaERC20Contract, signer])

    const isApproveMarket = useCallback(async ()=> {
        return await coopaERC20Contract.allowance(account, contractAddress.market)
            .then(res=> {
                if(res < BigNumber.from(10).pow(30)){
                    return false
                }
                return true
            })
    })

    const approveMarket = useCallback(async ()=> {
        return await coopaERC20Contract.approve(contractAddress.market, BigNumber.from(10).pow(60))
    }, [coopaERC20Contract, signer])

    const balanceOf = useCallback(async (address)=> {
        return await coopaERC20Contract.balanceOf(address)
    }, [coopaERC20Contract, signer])

    return {
        isApproveLK:isApproveLK,
        approveLK:approveLK,
        coopaERC20Contract: coopaERC20Contract,
        isApprove: isApprove,
        approve: approve,
        isApproveMarket:isApproveMarket,
        approveMarket:approveMarket,
        balanceOf:balanceOf
    }
}
