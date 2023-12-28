"use client"
import { setLogin } from "@/ReduxSlices/authSlice"
import { usePathname, useRouter } from "next/navigation"
import {RxCaretLeft, RxCaretRight} from 'react-icons/rx'
import { useDispatch, useSelector } from "react-redux"
import { twMerge } from "tailwind-merge"
import Search from "../components/Search"
import { HiPlay } from "react-icons/hi2"
import { signOut } from "firebase/auth"
import { auth } from "@/config/firbase"
import { setLoginStatus } from "@/ReduxSlices/authenticationSlice"
import { useState } from "react"
import Link from "next/link"
import { FaRegUser } from "react-icons/fa";
import Image from "next/image"

function Header({ children, className, style, playBtn, userName=null}) {

  const[show, setShow] = useState(false);
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { signUpData } = useSelector((state) => state.authenticationSlice);
  //console.log(playBtn)
  const router = useRouter();

const handleSignOut = async () => {
  dispatch(setLogin());
  router.push("/");
  await signOut(auth);
  dispatch(setLoginStatus(false));
  router.refresh();
};

  
  return (
    <div style={style} className={twMerge("px-6 py-4 w-full flex flex-col relative items-start gap-6", className)}>
      <div className="w-full flex justify-between items-center z-10">
        <div className="w-[70%] flex items-center gap-4 ">
          <div className={`${(playBtn || userName) && 'w-full'} flex items-center gap-4 transition-opacity duration-1000`}>
            <button onClick={router.back} className="p-0.5 z-10 rounded-full bg-black text-white transition duration-100 hover:opacity-75">
              <RxCaretLeft size={35} />
            </button>
            <button onClick={router.forward} className="p-0.5 rounded-full bg-black text-white transition duration-100 hover:opacity-75">
              <RxCaretRight size={35} />
            </button>
            {
              (playBtn || userName) && (
                <>
                  {
                    !userName && (
                      <button className={`${playBtn ? "appear visible" : "disappear hidden"} absolute bottom-2 left-[7.5rem] ml-4 mt-8 transition duration-1000 w-14 aspect-square mr-4 rounded-full flex items-center justify-center bg-green-500 p-3 drop-shadow-md hover:scale-110`}>
                        <HiPlay  size={24} className="text-black" />
                      </button>
                    )
                  }
                  <p className={`${playBtn ? "appear" : "disappear"}  ml-[4.5rem] text-ellipsis whitespace-nowrap overflow-hidden w-[100%] text-2xl font-semibold  uppercase`}>{playBtn}</p>
                </>
              )
            }
          </div>
          {pathname?.split("/")[1] === 'search' && (
            <Search/>
          )}
        </div>
        <div className="w-[30%] justify-end flex items-center gap-4 relative z-10">
          <button onClick={() => setShow(!show)} className={`${signUpData.profileUrl ? 'p-1' : 'p-2'} aspect-square font-semibold text-neutral-100 rounded-full bg-black transition duration-100 hover:opacity-75`}>
            {signUpData.profileUrl ? <Image src={signUpData.profileUrl} width={30} height={30} className="rounded-full w-[40px] aspect-square"/> : <FaRegUser className="" size={20}/>}
          </button>
          <div className={`absolute transition-all back duration-100 top-12 ${show ? 'visible opacity-100' : 'hidden opacity-0'} flex right-4 bg-[#282828]`}>
            <div className="w-52 rounded-sm p-1 flex text-sm font-medium text-neutral-300 flex-col items-start bg-[#282828]">
              <Link href="/account" className="w-full">
                <button className="px-4 -tracking-tight py-2.5 hover:bg-neutral-600 w-full text-start rounded-t-sm">
                  Profile
                </button>
              </Link>
              <button onClick={handleSignOut} className="px-4 -tracking-tight py-2.5 hover:bg-neutral-600 w-full text-start rounded-b-sm border-t border-neutral-700">
                LogOut
              </button>
            </div>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}

export default Header