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

export const LoadingFC = <img src={"/assets/img/loading.gif"} style={{fontSize:200}}/>

export const getCoopaEvolution = (level,rare) =>{
        let coopaEvolution = 0
        if (rare === "0") {
            coopaEvolution = 0
        }
        else {
        switch (level) {
            case '1':
                coopaEvolution =  1
                break
            case '2':
                coopaEvolution = 1
                break
            case '3':
                coopaEvolution = 1
                break
            case '4':
                coopaEvolution = 2
                break
            case '5':
                coopaEvolution = 2
                break
            case '6':
                coopaEvolution = 2
                break
            case '7':
                coopaEvolution = 2
                break
            case '8':
                coopaEvolution = 2
                break
        }
        }
        return coopaEvolution
    }

export const lsCoopaMap = [
        {name: 'Seed',shortName:'seed'},
        {name:'Poison Flower',shortName:'poisonflower'},
        {name:'Rose',shortName:'rose'},
        {name:'Sunflower',shortName:'sunflower'},
        {name:'Chilli',shortName:'chilli'},
        {name:'Ice Tree',shortName:'icetree'},
        {name:'Lotus',shortName:'lotus'},
        {name:'Onion',shortName:'onion'},
        {name:'Pea',shortName:'peas'},
        {name:'Bamboo',shortName:'bamboo'},
        {name:'Cactus',shortName:'cactus'},
        {name:'Berry',shortName:'berryplant'},
        {name:'Blue Berry',shortName:'blueberry'},
        {name:'Flower Mushroom',shortName:'flowermushroom'},
        {name:'Green Mushroom',shortName:'greenmushroom'},
        {name:'Ice Flower',shortName:'iceplant'},
    ]

export const lsTribe = ['Seed','Mornia','Noonia','Evenia','Nightia']

export const lsTribeMarket = ['Mornia','Noonia','Evenia','Nightia']



