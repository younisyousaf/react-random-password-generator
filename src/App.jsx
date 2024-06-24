import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(10);
  const [numCheck, setNumCheck] = useState(false);
  const [charCheck, setCharCheck] = useState(false);
  const [pass, setPass] = useState("");

  // Method For Random Password
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    // It will append the numbers
    if (numCheck) str += "0123456789";
    // It will append the special characters
    if (charCheck) str += "!@#$%^/|&*_-+=`~";

    // Loop for password length
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPass(pass);
  }, [length, numCheck, charCheck, setPass]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numCheck, charCheck, passwordGenerator]);

  // useRef Hook
  const passwordRef = useRef(null);

  const copyPassToClip = useCallback(() => {
    // This method will select the text
    passwordRef.current?.select();
    // This method will select the text of specific range
    passwordRef.current?.setSelectionRange(0, 9);
    window.navigator.clipboard.writeText(pass);
  }, [pass]);
  return (
    <>
      <h1 className="text-4xl text-center text-white my-3">
        Password Generator
      </h1>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-8 my-8 text-orange-300 bg-gray-500">
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={pass}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            className="outline-none bg-blue-700 hover:bg-blue-900 active:bg-value-900 text-white px-3 py-0.5 shrink-0"
            onClick={copyPassToClip}
          >
            COPY
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={8}
              max={30}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label htmlFor="">Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numCheck}
              id="numberInput"
              onChange={() => {
                setNumCheck((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charCheck}
              id="charInput"
              onChange={() => {
                setCharCheck((prev) => !prev);
              }}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
