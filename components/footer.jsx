import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { IoIosColorPalette } from "react-icons/io"
import { BsArrowUpRight } from "react-icons/bs";


export const Footer = () => {
  return (
    <div className="w-full h-32 flex flex-col justify-start items-center">

      <div className="w-full h-10 bg-gray-400 flex justify-center items-center text-white font-semibold leading-none text-lg">
        <span className="flex justify-center items-center gap-2 cursor-pointer hover:text-gray-200">LOG IN TO USE THE FULL FUNCTIONALITY OF THE PLATFORM <FaArrowRight /></span>
      </div>

      <div className="w-full max-w-7xl flex justify-between items-center h-[5.5rem] gap-2 text-lg">      
        <div className="flex justify-center items-center gap-16">
          <div className="flex justify-center items-center h-16 w-16">
            <IoIosColorPalette className="text-5xl text-[#007BFF] hover:text-[#1a89ff]"/>
          </div>
          <div className="flex justify-center items-center gap-16">
            <Link href="/support" className="text-gray-700 hover:text-black">
              <h4>Support</h4>
            </Link>
            <Link href="/terms" className="text-gray-700 hover:text-black">
              <h4>Terms</h4>
            </Link>
            <Link href="/privacy" className="text-gray-700 hover:text-black">
              <h4>Privacy</h4>
            </Link>
            <Link href="/pricing" className="text-gray-700 hover:text-black">
              <h4>Pricing</h4>
            </Link>
          </div>
        </div>
        <div className="flex justify-center items-center gap-8">
          <Link href="">
            <span className="flex text-gray-600 hover:text-black justify-center items-center leading-none gap-1">IG<BsArrowUpRight className="text-sm"/></span>
          </Link>
          <Link href="">
          <span className="flex text-gray-600 hover:text-black justify-center items-center leading-none gap-1">X<BsArrowUpRight className="text-sm"/></span>
          </Link>
          <Link href="">
          <span className="flex text-gray-600 hover:text-black justify-center items-center leading-none gap-1">LN<BsArrowUpRight className="text-sm"/></span>
          </Link>
          <Link href="" className="px-5 py-1 rounded-xl bg-white text-gray-600 border border-gray-600 hover:bg-gray-100 hover:text-black hover:border-black">
            <div className="flex justify-center items-center">Mail<BsArrowUpRight /></div>
          </Link>
        </div>
      </div>      

    </div>
  )
}