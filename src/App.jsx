import { useState,useCallback,useEffect,useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


function App() {
  const [length,setlength]=useState(8);
  const[numberallowed,setnumberallowed]=useState(false);
  const[character,setcharallowd]=useState(false);
  const[Password,setpassword]=useState("");

  // use ref hook

  const passwordref  = useRef(null);



   const PasswordGenerator = useCallback(()=>{

    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
   
    

    if(numberallowed)str+="0123456789";
    if(character)str+="`~!@#$%^&*";

    for (let i = 1; i <=length; i++) {
      let char =Math.floor(Math.random()*str.length+1);
      pass += str.charAt(char);

    }

    setpassword(pass);



   },[length,numberallowed,character,setpassword])

   const copypasswordtoclipboard = useCallback(()=>{
     passwordref.current?.select();
    // passwordref.current?.setSelectionRange(0,3);
     window.navigator.clipboard.writeText(Password);
   }, [Password])

   useEffect(()=>{
    PasswordGenerator();
   },[length,numberallowed,character,PasswordGenerator])

  return (
    <>
    
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-10 text-orange-500 bg-gray-800 '>
    <h1 className="text-3xl font-bold text-white text-center my-3">
      Password Generator
    </h1>

     <div className='flex shadow rounded-lg overflow-hidden my-10'>
      <input type="text" value={Password} className='outline-none w-full py-1 px-3' placeholder='password' 
      ref={passwordref}/>
      <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' 
      onClick={copypasswordtoclipboard}>copy</button>
     </div>
     <div className='flex text-sm gap-x-2'>

      <div className=' flex items-center gap-x-1'>
        <input 
        type="range" 
         min={6}
         max={100}
         value={length}
         className='cursor-pointer'
         onChange={(e)=>{setlength(e.target.value)}}/>
         <label > length: {length}</label>
      </div>
      <div className=' flex items-center gap-x-1'>
         <input type="checkbox"
         defaultChecked={numberallowed}
         id='numberInput'
         onChange={()=>{
          setnumberallowed((prev)=>!prev)
         }} />
         <label >Number </label>
      </div>
      <div className=' flex items-center gap-x-1'>
         <input type="checkbox"
         defaultChecked={character}
         id='characterInput'
         onChange={()=>{
          setcharallowd((prev)=>!prev)
         }} />
         <label >Character </label>
      </div>
     </div>
    </div>
    </>
  )
}

export default App
