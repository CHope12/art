import Nav from "@/components/ui/nav";
import PaintingList from "@/components/paintingList";

export default function Home() {

  return (
    <main className="flex flex-col justify-center items-center">
      <div className="w-full max-w-7xl">
        <Nav className="max-w-7xl"/>
      </div>
      <div className="w-full flex flex-col items-center">    
        <div className="w-full max-w-7xl flex justify-start">
          <h1 className="text-2xl font-semibold pb-3">Paintings</h1>
        </div>
        <PaintingList /> 
      </div>

    </main>
  )
}