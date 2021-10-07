import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {Provider} from "react-redux";
import 'antd/dist/antd.css';
import {UseWalletProvider} from "use-wallet";
import {ConfigProvider} from 'antd';
import store from "./redux/store"

const rootElement = document.getElementById("root");

export const chainId = () => {
    return 97
}

const app = (
        <Provider store={store}>
                <UseWalletProvider chainId={chainId} connectors={{
                    walletconnect: {
                        rpcUrl: "https://bsc-dataseed.binance.org",
                        bridge: "https://uniswap.bridge.walletconnect.org"
                    }
                }}>
                    <ConfigProvider>
                        <App/>
                    </ConfigProvider>
                </UseWalletProvider>
        </Provider>
);

ReactDOM.render(app, rootElement);
