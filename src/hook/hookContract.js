import {ethers} from "ethers";
import NftABi from "../abi/nft.json"
import MarketABi from "../abi/market.json"
import openBoxABi from "../abi/openBox.json"
import battleABi from "../abi/battle.json"
import erc20ABI from "../abi/ecr20.json"
import {contractAddress} from "../utils/contract";
import {useProvider} from "./hook";
import {multiCall} from "../utils/multicall";


export const useContract = (address, abi, signer) => {
    const provider = useProvider()
    return new ethers.Contract(address, abi, signer || provider)
}

export const useNFTcontract = (signer) => {
  return useContract(contractAddress.coopaNFT,NftABi, signer)
}

export const useMarketcontract = (signer) => {
  return useContract(contractAddress.market, MarketABi, signer)
}

export const useOpenBoxcontract = (signer) => {
  return useContract(contractAddress.openBox, openBoxABi, signer)
}

export const useBattlecontract = (signer) => {
  return useContract(contractAddress.fight, battleABi, signer)
}

export const useCoopaToken = (signer) => {
  return useContract(contractAddress.coopaToken, erc20ABI, signer)
}

export const useMultiCall = (abi,calls) => {
    const provider = useProvider()
    return multiCall(abi,calls,provider)
}
