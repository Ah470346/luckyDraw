import {useCallback} from 'react';
import { ethers } from 'ethers';
import Web3 from 'web3';
import abi from '../abi.json';


export const ConnectKaiWallet = () =>{
    const web3 = new Web3(window.kardiachain);
    const wallet = async () =>{
        return await web3.eth.getAccounts();
    }
    const connect = () =>{
        // const ballance = await web3.eth.getBalance(account.toString());
        // const provider = new ethers.providers.Web3Provider(window.kardiachain);
        const contract = new web3.eth.Contract(abi,"0xb8e47DA90e0D3067f2f9F9f83E515331B8939C5E");
        return {
            contract
        }
    }
    const test = useCallback(
        async () => {
            return connect().contract.methods.returnminute().call();
        },[]);

    const farm = useCallback(
        async() => {
            const account = await wallet();
            return connect().contract.methods._farmfarm(account[0]).send({from:window.kardiachain.selectedAddress});
        },[])
    return {
        test,
        farm
    }
    
};


