import { useState } from "react"

const Toss = () => {
  const [angle, setAngle] = useState<number>(0)
  const flipCoin = ()=>{
    if(Math.random() > 0.5){
      setAngle((prev)=> prev + 180);
    }
    else{
      setAngle((prev)=> prev + 360)
    }
  }
  return (
    <main className=" p-8">
            <h1 className=" mb-12 ml-8 font-bold text-2xl">Toss</h1>
            <section className=" flex flex-col items-center  gap-8 h-full">
                <article className="tosscoin m-8 h-60 w-60 relative cursor-pointer " onClick={flipCoin} style={{transform: `rotateY(${angle}deg)`}}>
                  <div className="first rounded-full h-full w-full absolute grid place-items-center bg-no-repeat" >
                  
                  </div>
                  <div className="second rounded-full h-full w-full absolute grid place-items-center bg-no-repeat"></div>
                </article>
            </section>
        </main>
   
  )
}

export default Toss