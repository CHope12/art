
"use client";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";

const LandscapeItem = ({ title, author, location, price, salePrice, src, handleClick }) => {
  
  const [liked, setLiked] = useState(false);
  
  function likeHandler() {
    setLiked(!liked);
  }

  return (
    <div className="relative w-96 h-96 flex flex-col">
      <div 
        className="relative h-[56.25%] cursor-pointer"
        onClick={handleClick}
      >
        <Image className="rounded-[20px] z-10 object-cover border border-gray-300" src={src} fill alt="image1"/>
      </div>
      <div className="absolute bottom-0 w-[calc(100%-10px)] h-[50%] rounded-b-[20px] mx-[5px] pt-8 px-4 border border-gray-200 flex flex-col text-[#111111] shadow-xl gap-3">
        <h3 className="font-semibold text-xl">{title}</h3>
        <h4>By <span className="text-[#1a89ff] hover:text-[#0063cc] hover:underline cursor-pointer">{author}</span>, {location}</h4>
        <div className="flex w-full gap-6">
          <span className="font-semibold">${price}</span>
          {salePrice && (
            <span className="text-gray-400"><s>${salePrice}</s></span>
          )}
          {salePrice && (            
            <span className="text-[#1a89ff]">{((1 - price / salePrice).toFixed(2)).toString().substring(2)}% off</span>
          )}
        </div>
        <div className="flex gap-4">
          <div 
            className="border rounded-full bg-[#1a89ff] px-4 py-1 text-white hover:bg-[#4da3ff] cursor-pointer"
            onClick={handleClick}
          >
            Buy Now
          </div>
          <div className="border rounded-full px-4 py-1 border-[#1a89ff] text-[#1a89ff] hover:text-[#4da3ff] cursor-pointer">
            Add to bag
          </div>        
          <div className="border rounded-full flex justify-center items-center px-2 shadow-sm">
            {!liked && (
              <FaRegHeart className="text-gray-400 hover:text-red-500 cursor-pointer" onClick={likeHandler}/>
            )}
            {liked && (
              <FaHeart className="text-red-500 hover:text-gray-400 cursor-pointer" onClick={likeHandler}/>
            )}                                    
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandscapeItem;