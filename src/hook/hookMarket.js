import {useMarketcontract} from "./hookContract";
import {useCallback} from 'react'
import {useSigner} from "./hook";

export const useMarketAction = () => {
    const signer = useSigner()
    const marketContract = useMarketcontract(signer)
    const getMarketSize = useCallback(async () => {
        return marketContract.marketsSize()
    }, [marketContract])

    const getTokenSaleByIndex = useCallback(async (tokenId) => {
        return marketContract.tokenSaleByIndex(tokenId)
    }, [marketContract])

    const getOrderSale = useCallback(async (coopaId) => {
        return marketContract.orderSale(coopaId)
    }, [marketContract])

    const getOrderOfAddress = useCallback(async (address) => {
        return marketContract.orders(address)
    }, [marketContract])

    const getTokenSaleOfOwnerByIndex = useCallback(async (address, index) => {
        return marketContract.tokenSaleOfOwnerByIndex(address, index)
    }, [marketContract])

    const placeOrder = useCallback(async (tokenId, price) => {
        return marketContract.placeOrder(tokenId, price)
    }, [marketContract])


    const cancelOrder = useCallback(async (tokenId) => {
        return marketContract.cancelOrder(tokenId)
    }, [marketContract])

    const fillOrder = useCallback(async (tokenId) => {
        return marketContract.fillOrder(tokenId)
    }, [marketContract])


    return {
        marketContract: marketContract,
        getMarketSize: getMarketSize,
        getTokenSaleByIndex: getTokenSaleByIndex,
        getOrderSale: getOrderSale,
        getOrderOfAddress: getOrderOfAddress,
        getTokenSaleOfOwnerByIndex: getTokenSaleOfOwnerByIndex,
        placeOrder: placeOrder,
        fillOrder: fillOrder,
        cancelOrder: cancelOrder

    }
}
