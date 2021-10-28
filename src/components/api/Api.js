import {ethers} from "ethers";
import React from "react";
import {notification} from "antd";

export function openNotificationWithIcon (type,message,description) {
  notification[type]({
    message: message,
    description: description
  });
};



export const getBalance = (wallet) => {
    const balance = ethers.utils.formatUnits(wallet.balance, "ether").toString();
    return parseFloat(balance).toFixed(2);
}

export const convertBigNumBer = (value) => {
    return parseFloat(ethers.utils.formatUnits(value, "ether").toString()).toFixed(2)
}

export const LoadingFC = <img src={"/assets/img/loading.gif"} alt={'loading'} style={{fontSize:200}}/>




