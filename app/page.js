import Image from "next/image";
import Link from "next/link";

import Nav from "@/components/ui/nav";
import { Footer } from "@/components/footer"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { PiMapPin } from "react-icons/pi";


export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center">
      <div className="w-full max-w-7xl">

        <Nav />
        
        <div className="flex flex-col items-center gap-4 pt-8">

          {/* Hero card */}
          <div className="flex justify-center items-center w-full h-96 rounded-[50px] bg-[#A4C3B2]">
            <div className="flex w-full h-full">
              <div className="flex flex-col w-1/2 p-12 justify-between">
                <div className="flex flex-col gap-3">
                  <span className="text-4xl text-[#111111] font-semibold">Where Art Finds a Home: Your Destination for Unique & Inspiring Creations</span>
                  <span className="text-[#444]">Discover, Collect, and Own Unique Art from Talented Creators Worldwide</span>
                </div>
                <Link href="/explore" className="border border-black rounded-full flex justify-center items-center px-5 py-3 w-1/4 cursor-pointer hover:text-gray-700 hover:border-gray-700">
                  Explore
                </Link>
              </div>
              <div className="w-1/2 relative">
                <Image className="rounded-[50px]" src="/hero.jpg" fill alt="Hero Painting Image"/>
              </div>
            </div>
          </div>

          {/* Featured */}

          <div className="flex flex-col gap-2 w-full pt-8">
          <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold">Featured Art</h1>
              <div className="text-[#444] px-2 cursor-pointer hover:text-[#333]">SHOW ALL</div>
            </div>
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full"
            >
              <CarouselContent>
                {Array.from({ length: 8 }).map((_, index) => (
                  <CarouselItem key={index} className="basis-1/3 lg:basis-1/5">
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <span className="text-3xl font-semibold">{index + 1}</span>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          <div className="flex flex-col gap-2 w-full py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold">Most-Viewed</h1>
              <div className="text-[#444] px-2 cursor-pointer hover:text-[#333]">SHOW ALL</div>
            </div>
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full"
            >
              <CarouselContent>
                {Array.from({ length: 8 }).map((_, index) => (
                  <CarouselItem key={index} className="basis-1/3 lg:basis-1/5">
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <span className="text-3xl font-semibold">{index + 1}</span>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          {/* 2nd card */}
          
          <div className="flex justify-center items-center w-full h-96 rounded-[50px] bg-[#A4C3B2]">
            <div className="flex w-full h-full">
              <div className="flex flex-col w-1/2 p-12 justify-between">
                <div className="flex flex-col gap-3">
                  <span className="text-4xl text-[#111111] font-semibold">Artist Spotlight</span>
                  <span className="text-[#444]">Discover the Visionaries Behind Today’s Most Captivating Works</span>
                </div>
              </div>
              <div className="w-1/2 relative">
                <Image src="/artist.png" alt="Artist Image" fill objectFit="contain"/>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full pt-4">

            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold">Featured Artists</h1>
              <div className="text-[#444] px-2 cursor-pointer hover:text-[#333]">SHOW ALL</div>
            </div>

            <div className="flex justify-center items-center gap-16 py-6">

              <div className="relative w-80 h-60 border border-gray-400 flex justify-center items-center flex-col gap-2 rounded-[30px] group cursor-pointer">                
                <div className="relative w-32 h-32 flex justify-center items-center">                  
                  <Image className="w-32 h-32 rounded-full shadow-xl" src="/artist1.jpg" alt="Artist Image" fill objectFit="cover"/>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <h3 className="font-semibold text-xl">Artist Name</h3>
                  <span className="flex justify-center items-center gap-2"><PiMapPin />Multiple / Locations</span>
                </div>                
                <div className="absolute w-full h-40 top-6 group-hover:top-0 rounded-t-[25px] overflow-hidden -z-20 transition-all">
                  <Image src="/hero.jpg" fill alt="Featured Artist Image 1"/>
                </div>
                <div className="absolute w-full h-28 bottom-0 rounded-[30px] bg-white -z-10"/>
              </div>
              <div className="relative w-80 h-60 border border-gray-400 flex justify-center items-center flex-col gap-2 rounded-[30px] group cursor-pointer">                
                <div className="relative w-32 h-32 flex justify-center items-center">                  
                  <Image className="w-32 h-32 rounded-full shadow-xl" src="/artist2.jpg" alt="Artist Image" fill objectFit="cover"/>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <h3 className="font-semibold text-xl">Artist Name</h3>
                  <span className="flex justify-center items-center gap-2"><PiMapPin />Multiple / Locations</span>
                </div>                
                <div className="absolute w-full h-40 top-6 group-hover:top-0 rounded-t-[25px] overflow-hidden -z-20 transition-all">
                  <Image src="/hero.jpg" fill alt="Featured Artist Image 1"/>
                </div>
                <div className="absolute w-full h-28 bottom-0 rounded-[30px] bg-white -z-10"/>
              </div>
              <div className="relative w-80 h-60 border border-gray-400 flex justify-center items-center flex-col gap-2 rounded-[30px] group cursor-pointer">                
                <div className="relative w-32 h-32 flex justify-center items-center">                  
                  <Image className="w-32 h-32 rounded-full shadow-xl" src="/artist3.jpg" alt="Artist Image" fill objectFit="cover"/>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <h3 className="font-semibold text-xl">Artist Name</h3>
                  <span className="flex justify-center items-center gap-2"><PiMapPin />Multiple / Locations</span>
                </div>                
                <div className="absolute w-full h-40 top-6 group-hover:top-0 rounded-t-[25px] overflow-hidden -z-20 transition-all">
                  <Image src="/hero.jpg" fill alt="Featured Artist Image 1"/>
                </div>
                <div className="absolute w-full h-28 bottom-0 rounded-[30px] bg-white -z-10"/>
              </div>

            </div>
          </div>


          <div className="flex justify-center items-center w-full h-96 rounded-[50px] bg-[#A4C3B2] mt-4 mb-12">
            <div className="flex w-full h-full">
              <div className="flex flex-col w-1/2 p-12 justify-between">
                <div className="flex flex-col gap-3">
                  <span className="text-4xl text-[#111111] font-semibold">Why Us?</span>
                  <span className="text-[#444]">Artists using our platform are charged 0% and recieve all royalties from their creations.</span>
                </div>                
                <div className="border border-black rounded-full flex justify-center items-center px-5 py-3 w-1/4 cursor-pointer hover:text-gray-700 hover:border-gray-700">
                  Our Story
                </div>
              </div>
              <div className="w-1/2 relative">
                <Image src="/artist.png" alt="Artist Image" fill objectFit="contain"/>
              </div>
            </div>
          </div>          

        </div>
      </div>
      <Footer />
    </main>
  );
}
