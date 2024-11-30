import { FormEvent, useEffect, useState } from "react";
const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const allNumbers = "1234567890";
const allSymbols = "!@#$%^&*()_+";

const Coupon = () => {
  const [size, setSize] = useState<number>(8);
  const [prefix, setPrefix] = useState<string>("");
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(false);
  const [includeCharacters, setIncludeCharacters] = useState<boolean>(false);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const [coupon, setCoupon] = useState<string>("");

  const copyText = async (coupon: string) => {
    await window.navigator.clipboard.writeText(coupon);
    setIsCopied(true);
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!includeNumbers && !includeCharacters && !includeSymbols)
      return alert("Please Select One At Least");

    let result: string = prefix || "";
    const loopLength: number = size - result.length;

    for (let i = 0; i < loopLength; i++) {
      let entireString: string = "";
      if (includeCharacters) entireString += allLetters;
      if (includeNumbers) entireString += allNumbers;
      if (includeSymbols) entireString += allSymbols;

      const randomNum: number = ~~(Math.random() * entireString.length);
      result += entireString[randomNum];
    }

    setCoupon(result);
  };

  useEffect(() => {
    setIsCopied(false);
  }, [coupon]);

  return (
    <main className=" p-8">
            <h1 className=" mb-12 ml-8 font-bold text-2xl">Coupon</h1>
            <section className="items-center justify-center gap-8">
          <form className="coupon-form grid grid-cols-[2fr] grid-rows-[1fr] gap-8 " onSubmit={submitHandler}>
            <input className=" p-4 outline-none rounded"
              type="text"
              placeholder="Text to include"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              maxLength={size}
            />

            <input className=" p-4 outline-none rounded"
              type="number"
              placeholder="Coupon Length"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              min={8}
              max={25}
            />

            <fieldset className=" p-4 flex-wrap rounded flex flex-row items-center justify-center gap-0">
              <legend>Include</legend>

              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={() => setIncludeNumbers((prev) => !prev)}
              />
              <span className=" ml-1 mr-4 text-sm font-light">Numbers</span>

              <input
                type="checkbox"
                checked={includeCharacters}
                onChange={() => setIncludeCharacters((prev) => !prev)}
              />
              <span className=" ml-1 mr-4 text-sm font-light">Characters</span>

              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={() => setIncludeSymbols((prev) => !prev)}
              />
              <span className=" ml-1 mr-4 text-sm font-light">Symbols</span>
            </fieldset>
            <button type="submit" className="btngrid font-bold text-lg w-full p-4 border-none text-white cursor-pointer my-8 rounded-lg bg-blue-500">Generate</button>
          </form>

          {coupon && (
            <code className=" relative text-lg tracking-[2px] cursor-pointer ">
              {coupon}{" "}
              <span className=" opacity-0 text-center hover:opacity-100 h-full w-full top-0 left-0 absolute rounded bg-black text-white"
               onClick={() => copyText(coupon)}>
                {isCopied ? "Copied" : "Copy"}
              </span>{" "}
            </code>
          )}
        </section>
        </main>
 
  )
}

export default Coupon