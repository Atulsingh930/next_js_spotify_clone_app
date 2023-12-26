"use client"
import { setLogin } from "@/ReduxSlices/authSlice"
import { usePathname, useRouter } from "next/navigation"
import {RxCaretLeft, RxCaretRight} from 'react-icons/rx'
import { useDispatch } from "react-redux"
import { twMerge } from "tailwind-merge"
import Search from "../components/Search"
import { HiPlay } from "react-icons/hi2"
import { signOut } from "firebase/auth"
import { auth } from "@/config/firbase"
import { setLoginStatus } from "@/ReduxSlices/authenticationSlice"

function Header({ children, className, style, playBtn}) {
  const pathname = usePathname();
  const dispatch = useDispatch();
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
          <div className={`${playBtn && 'w-full'} flex items-center gap-4 transition-opacity duration-1000`}>
            <button onClick={router.back} className="p-0.5 z-10 rounded-full bg-black text-white transition duration-100 hover:opacity-75">
              <RxCaretLeft size={35} />
            </button>
            <button onClick={router.forward} className="p-0.5 rounded-full bg-black text-white transition duration-100 hover:opacity-75">
              <RxCaretRight size={35} />
            </button>
            {
              playBtn && (
                <>
                  <button className={`${playBtn ? "appear visible" : "disappear hidden"} absolute bottom-2 left-[7.5rem] ml-4 mt-8 transition duration-1000 w-14 aspect-square mr-4 rounded-full flex items-center justify-center bg-green-500 p-3 drop-shadow-md hover:scale-110`}>
                    <HiPlay  size={24} className="text-black" />
                  </button>
                  <p className={`${playBtn ? "appear" : "disappear"}  ml-[4.5rem] text-ellipsis whitespace-nowrap overflow-hidden w-[100%] text-2xl font-semibold  uppercase`}>{playBtn}</p>
                </>
              )
            }
          </div>
          {pathname?.split("/")[1] === 'search' && (
            <Search/>
          )}
        </div>
        <div className="w-[30%] justify-end flex items-center gap-4">
          <button onClick={handleSignOut} className="px-7 py-2 font-semibold rounded-3xl text-black bg-white transition duration-100 hover:opacity-75">
            Sign Out
          </button>
        </div>
      </div>
      {children}
    </div>
  );
}

export default Header