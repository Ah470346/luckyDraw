import {useSelector} from 'react-redux'

export const useProvider = () => {
    return useSelector((state) => state.eth.provider)
}

export const useSigner = () => {
    return useSelector((state) => state.eth.signer)
}
