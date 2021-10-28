const CHANGE_SUM_REWARD = "CHANGE_SUM_REWARD";

const initState = {
    sumReward: 0
}

export const changeSumReward = (reward) =>{
    return {
        payload: reward,
        type:CHANGE_SUM_REWARD
    }   
}

const rewardReducer = (state = initState,action) =>{
    switch(action.type){
        case  CHANGE_SUM_REWARD:
            return {
                sumReward:action.payload
            }
        default:
            return state;
    }
}




export default rewardReducer;