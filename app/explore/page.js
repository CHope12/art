import Nav from "@/components/ui/nav";
//import PaintingList from "@/components/paintingList";
import ExploreAnimatedCard from "@/components/exploreAnimatedCard";

export default function Home() {

  const paintings = [
    { 
      href: "/paintings/0.jpg", //16x11      
      delay: 0
    },
    { 
      href: "/paintings/1.jpg",      
      delay: -4
    },
    { 
      href: "/paintings/2.jpg",      
      delay: -2
    },
    { 
      href: "/paintings/3.jpg",      
      delay: -6 
    },
    { 
      href: "/paintings/0.jpg",      
      delay: -8 
    },
  ];

  const drawings = [
    {
      href: "/drawings/1.jpg",
      delay: 0
    },
    {
      href: "/drawings/2.jpg",
      delay: -2
    },
    {
      href: "/drawings/3.jpg",
      delay: -4
    },
    {
      href: "/drawings/1.jpg",
      delay: -6
    },
    {
      href: "/drawings/2.jpg",
      delay: -8
    },
    {
      href: "/drawings/3.jpg",
      delay: -10
    }
  ]

  const digital = [
    {
      href: "/digital/1.jpg",
      delay: 0
    },
    {
      href: "/digital/2.jpg",
      delay: -2
    },
    {
      href: "/digital/3.jpg",
      delay: -4
    },
    {
      href: "/digital/1.jpg",
      delay: -6
    },
    {
      href: "/digital/2.jpg",
      delay: -8
    },
    {
      href: "/digital/3.jpg",
      delay: -10
    }
  ]

  return (
    <main className="flex flex-col justify-center items-center">
      <div className="w-full max-w-7xl">
        <Nav className="max-w-7xl"/>
      </div>
      <div className="w-full max-w-7xl flex justify-around items-center pt-12"> 
        <div className="w-[calc(33.33%-10px)] h-[75vh] bg-gray-100 hover:bg-gray-200 rounded-sm">
          <ExploreAnimatedCard           
            title={"Paintings"} 
            desc={"Explore our curated collection of paintings"} 
            images={paintings} 
            href="/explore/paintings" />          
        </div>
        <div className="w-[calc(33.33%-10px)] h-[75vh] bg-gray-100 hover:bg-gray-200 rounded-sm">
          <ExploreAnimatedCard           
            title={"Drawings"} 
            desc={"Discover our captivating collection of drawings"} 
            images={drawings} 
            href="/explore/paintings" />          
        </div>
        <div className="w-[calc(33.33%-10px)] h-[75vh] bg-gray-100 hover:bg-gray-200 rounded-sm">
          <ExploreAnimatedCard           
            title={"Digital"} 
            desc={"Experience the creativity of digital artwork"} 
            images={digital} 
            href="/explore/paintings" />          
        </div>
      </div>

    </main>
  )
}