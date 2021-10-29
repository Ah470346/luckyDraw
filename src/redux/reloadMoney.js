const CHANGE_MONEY = "CHANGE_MONEY";

const initState = {
    money: 0
}

export const changeMoney = (money) =>{
    return {
        payload: money,
        type:CHANGE_MONEY
    }   
}

const Reducer = (state = initState,action) =>{
    switch(action.type){
        case  CHANGE_MONEY:
            return {
                money:action.payload
            }
        default:
            return state;
    }
}




export default Reducer;