import { useEffect, useState } from "react";

const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
  
    const hoursInString = hours.toString().padStart(2, "0");
    const minutesInString = minutes.toString().padStart(2, "0");
    const secondsInString = seconds.toString().padStart(2, "0");
  
    return `${hoursInString}:${minutesInString}:${secondsInString}`;
  };
const StopWatch = () => {
    const [time, setTime] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
  
    const resetHandler = () => {
      setTime(0);
      setIsRunning(false);
    };
    
  
    useEffect(() => {
       
     let intervalID : any
    if(isRunning){
      intervalID  = setInterval(()=>{
        setTime((prev) => prev + 1)
      },1000
    )
    }
      return ()=>{
        clearInterval(intervalID)
      }
    }, [isRunning]);
  
  return (
    <main className=" p-8">
            <h1 className=" mb-12 ml-8 font-bold text-2xl">Stopwatch</h1>
            <section className=" flex flex-col items-center justify-center gap-8 h-full">
             <div className="stopwatch ">
                <h2 className=" text-4xl font-light text-center">{formatTime(time)}</h2>
                <button onClick={()=> setIsRunning((prev)=> !prev)} className=" py-4 px-8 cursor-pointer bg-blue-600 text-white m-8 font-bold rounded-lg">{isRunning? "Stop":"Start"}</button>
                <button onClick={resetHandler} className=" py-4 px-8 cursor-pointer bg-red-600 text-white m-8 font-bold rounded-lg">Reset</button>
             </div>
            </section>
        </main>
   
  )
}

export default StopWatch