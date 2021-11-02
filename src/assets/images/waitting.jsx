import React,{useEffect} from 'react';
import { useLKaction } from '../../hook/hookLK';

function Waitting({setShowResult,fetch,lastTime}) {
    const luckyDrawAction = useLKaction;
    const {getLastTime} = luckyDrawAction();
    useEffect(()=>{
        const id = setInterval(()=>{
            getLastTime().then((res)=> {
                if(Number(res.toString())*1000 !== lastTime) {
                    fetch(true,true);
                    clearInterval(id);
                    setShowResult(0);
                }
            });
        },1000);
        return ()=>{clearInterval(id)};
    },[]);
    return (
        <div className='waiting-content reset'>
            <p className='p'>This wave has no players, <br /> please wait to reset this wave ...</p>
        </div>
    )
}


export default Waitting;

