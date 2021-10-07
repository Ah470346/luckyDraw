import React from "react";
import {
    BrowserRouter as Router,
    Switch,
} from "react-router-dom";
import BaseRouter from "./routes";
import {Layout} from "./components/Layout";
import {useWallet} from "use-wallet";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {updateProvider, updateSigner} from "./redux/ethereum";

const App = () => {
    const {account, ethereum, connect} = useWallet()
    const dispatch = useDispatch()
    const currentAccount = localStorage.getItem('account')
    useEffect(()=>{
        if (currentAccount) {
            connect('injected')
        }
    },[])

    useEffect(() => {
        if (ethereum) {
            dispatch(updateProvider(ethereum))
        }
        if (account) {
            localStorage.setItem('account',account)
            dispatch(updateSigner(account))
        }
    }, [ethereum, account])

    return (<Router>
        <Layout>
            <Switch>
                <BaseRouter/>
            </Switch>
        </Layout>
    </Router>)
};

export default App;
