import {useOpenBoxcontract} from "./hookContract";
import {useCallback} from 'react'
import {useSigner} from "./hook";

export const useOpenBoxAction = () => {
    const signer = useSigner()
    const openBoxContract = useOpenBoxcontract(signer)

    const getSeedPrice = useCallback(async () => {
        return openBoxContract.seedPrice()
    }, [openBoxContract])

    const buySeed = useCallback(async (amount) => {
        return openBoxContract.buy(amount)
    }, [openBoxContract])

    const openSeed = useCallback(async (amount) => {
        return openBoxContract.openSeed(amount)
    }, [openBoxContract])

    return {
        openBoxContract: openBoxContract,
        getSeedPrice: getSeedPrice,
        buySeed: buySeed,
        openSeed: openSeed,
    }
}
