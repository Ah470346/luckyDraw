import {createSlice} from "@reduxjs/toolkit";
import {ethers} from "ethers";

const defaultProvider = () => {
    return new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-2-s2.binance.org:8545/");
    // return new ethers.providers.JsonRpcProvider("https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161")
}

// return new ethers.providers.EtherscanProvider('rinkeby')
    // return new ethers.providers.JsonRpcProvider("https://api-rinkeby.etherscan.io/TAYFCRJUYUBS26PMSZC9CHP7TDCQ4Y8ZPX")


const initialState = {
    provider: defaultProvider(),
    signer: defaultProvider()
}

export const ethSlice = createSlice({
    name: "ETH-State",
    initialState: initialState,
    reducers: {
        updateProvider: (state, action) => {
            state.provider = action.payload ? new ethers.providers.Web3Provider(action.payload) : defaultProvider()
        },
        updateSigner: (state, action) => {
            // @ts-ignore
            state.signer = state.provider.getSigner(action.payload)
        }
    },
});

export const {updateProvider, updateSigner} = ethSlice.actions;

export default ethSlice.reducer;
