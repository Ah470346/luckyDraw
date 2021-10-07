import {ethers} from 'ethers'
import {contractAddress} from "./contract";
import MultiCallAbi from "../abi/multicall.json"

export const multiCall = async (abi, calls, provider) => {
    const multi = new ethers.Contract(contractAddress.mutilCall, MultiCallAbi, provider)
    const itf = new ethers.utils.Interface(abi)
    const callData = calls.map((call) => [call.address.toLowerCase(), itf.encodeFunctionData(call.name, call.params)])
    const {returnData} = await multi.aggregate(callData)
    return returnData.map((call, i) => itf.decodeFunctionResult(calls[i].name, call))
}