"use cleint"
import { useState, useEffect, useMemo } from "react";

import { IoMdClose } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { LuRotate3D } from "react-icons/lu";
import { TiTick } from "react-icons/ti";



import { Canvas, useThree } from "@react-three/fiber";
import { Stats, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

import { getAspectRatio } from "@/lib/utils";

import { Button } from "@/components/ui/button"


export default function Modal({ item, onClose}) {

  /* Art options */
  const [type, setType] = useState("poster");
  const [size, setSize] = useState(null);
  const [color, setColor] = useState("#2b2b2b");

  /* Three */

  const [url, setUrl] = useState(item.src);

  const [aspectRatio, setAspectRatio] = useState(null);
  const [orientation, setOrientation] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (!item.src) return;
    //image is not a constructor
    const image = document.createElement('img');
    image.src = url;
    image.onload = () => {
      const [aR, or] = getAspectRatio(image);
      setAspectRatio(aR);      
      setOrientation(or);
    };
  }, [item.src]);

  useEffect(() => {
    setUrl(item.src);
  }, [item]);  

  useEffect(() => {
    setImageLoaded(true);
  }, [aspectRatio]);


  const ImageTexture = ({ texture }) => {
    if (!texture || aspectRatio === null) return null;

    // Load textures for canvas effect
    const normalMap = useMemo(() => new THREE.TextureLoader().load('/canvas/normalGL.jpg'), []);
    const displacementMap = useMemo(() => new THREE.TextureLoader().load('/canvas/displacement.jpg'), []);
    const roughnessMap = useMemo(() => new THREE.TextureLoader().load('/roughness.jpg'), []);

    const thickness = 0.1; // Fixed thickness for the metallic object

      return (      
        <group>
          {/* Front Side */}
          {type === null || type === "poster" ? (
            <mesh>
              {orientation === "landscape" ? (
                <planeGeometry attach="geometry" args={[2 * aspectRatio, 2]} />
              ) : (
                <planeGeometry attach="geometry" args={[2 / aspectRatio, 2]} />
              )}
              <meshBasicMaterial
                attach="material"
                map={texture}
                side={THREE.FrontSide} // Only render texture on the front side
              />
            </mesh>
          ) : null}

          {/* Back Side */}
          {type === null || type === "poster" ? (
            <mesh rotation={[0, Math.PI, 0]} position={[0, 0, -0.001]}>
              {orientation === "landscape" ? (
                <planeGeometry attach="geometry" args={[2 * aspectRatio, 2]} />
              ) : (
                <planeGeometry attach="geometry" args={[2 / aspectRatio, 2]} />
              )}
              <meshBasicMaterial
                attach="material"
                color="white" // Plain white for the back side
                side={THREE.FrontSide} // Render this material on the back-facing plane
              />
            </mesh>
          ) : null}

          {/* Canvas Object */}      
          {type === "canvas" ? (
            <mesh>
              {orientation === "landscape" ? (
                <boxGeometry attach="geometry" args={[2 * aspectRatio, 2, thickness]} />
              ) : (
                <boxGeometry attach="geometry" args={[2 / aspectRatio, 2, thickness]} />
              )}
              <meshStandardMaterial
                attach="material"
                map={texture} // Main texture
                normalMap={normalMap} // Simulates canvas texture
                //displacementMap={displacementMap} // Adds depth effect
                //displacementScale={0.05} // Controls the intensity of depth
                roughnessMap={roughnessMap}
                roughness={0.9}
              />
            </mesh>
          ) : null}

          {/* Framed Object */}
          {type === "framed" ? (            
            <group>
            {/* Main Plane (Image or Texture) */}
            <mesh>
              {orientation === "landscape" ? (
                <planeGeometry attach="geometry" args={[2 * aspectRatio, 2]} />
              ) : (
                <planeGeometry attach="geometry" args={[2 / aspectRatio, 2]} />
              )}
              <meshBasicMaterial
                attach="material"
                map={texture}
                side={THREE.FrontSide} // Only render texture on the front side
              />
            </mesh>

            {/* Frame - Four Sides */}            
            {/* Top Side */}
            <mesh position={[0, 1.05, 0.05]}>
              {orientation === "landscape" ? (
                <boxGeometry
                  attach="geometry"
                  args={[2 * aspectRatio + 0.1, 0.1, 0.1]} // Width, height, thickness
                />
              ) : (
                <boxGeometry
                  attach="geometry"
                  args={[2 / aspectRatio + 0.1, 0.1, 0.1]}
                />
              )}
              <meshStandardMaterial
                attach="material"
                color={color} // Frame color
                roughness={0.8}
                metalness={0.1}
              />
            </mesh>

            {/* Bottom Side */}
            <mesh position={[0, -1.05, 0.05]}>
              {orientation === "landscape" ? (
                <boxGeometry
                  attach="geometry"
                  args={[2 * aspectRatio + 0.1, 0.1, 0.1]} // Width, height, thickness
                />
              ) : (
                <boxGeometry
                  attach="geometry"
                  args={[2 / aspectRatio + 0.1, 0.1, 0.1]}
                />
              )}
              <meshStandardMaterial
                attach="material"
                color={color}
                roughness={0.8}
                metalness={0.1}
              />
            </mesh>
            
            {/* Left side */}
            <mesh position={
              orientation === "landscape" ? 
              [-(2 * aspectRatio) / 2 - 0.05, 0, 0.05] : 
              [-(2 / aspectRatio) / 2 - 0.05, 0, 0.05]}>

              {orientation === "landscape" ? (
                <boxGeometry
                  attach="geometry"
                  args={[0.1, 2 + 0.2, 0.1]} // Width, height, thickness
                />
              ) : (
                <boxGeometry
                  attach="geometry"
                  args={[0.1, 2 + 0.2, 0.1]}
                />
              )}
              <meshStandardMaterial
                attach="material"
                color={color}
                roughness={0.8}
                metalness={0.1}
              />
            </mesh>

            {/* Right Side */}
            <mesh position={
              orientation === "landscape" ? 
              [(2 * aspectRatio) / 2 + 0.05, 0, 0.05] : 
              [(2 / aspectRatio) / 2 + 0.05, 0, 0.05]}>
              {orientation === "landscape" ? (
                <boxGeometry
                  attach="geometry"
                  args={[0.1, 2 + 0.2, 0.1]} // Width, height, thickness
                />
              ) : (
                <boxGeometry
                  attach="geometry"
                  args={[0.1, 2 + 0.2, 0.1]}
                />
              )}
              <meshStandardMaterial
                attach="material"
                color={color}
                roughness={0.8}
                metalness={0.1}
              />
            </mesh>
          </group>
          ) : null}


          {/* Metallic Object */}
          {type === "metallic" ? (
            <mesh>
              {orientation === "landscape" ? (
                <boxGeometry
                  attach="geometry"
                  args={[2 * aspectRatio, 2, thickness]} // Width, height, depth
                />
              ) : (
                <boxGeometry
                  attach="geometry"
                  args={[2 / aspectRatio, 2, thickness]} // Width, height, depth
                />
              )}
              <meshStandardMaterial
                attach="material"
                map={texture}
                metalness={0.8}
                roughness={0.25}
              />
            </mesh>
          ) : null}
      </group>
    );
  };

  const Image = ({ url }) => {
    const texture = useMemo(() => new THREE.TextureLoader().load(url), [url]);
    return <ImageTexture texture={texture} />;
  };

  function Scene() {
    const { camera } = useThree();
    camera.position.x = 0;
    camera.position.y = 0.1;
    camera.position.z = 2;
    return (
      <>
        <directionalLight position={[0, 1, 2]} intensity={4} />
        <ambientLight intensity={0.5} />
        {/*
        <mesh>
          <boxGeometry attach="geometry" args={[1, 1, 1]} />
          <meshStandardMaterial attach="material" color="#6be092" />
        </mesh>
        */}
        {imageLoaded && <Image url={url} />}
        <OrbitControls />
        <Stats />
      </>
    );
  }

  /* Functionality */

  const [liked, setLiked] = useState(false);
  function handleLike() {
    setLiked(!liked);
  }

  const [stage, setStage] = useState(1);

  const handleStage = () => {
    setStage(stage+1);
  }

  const handleBack = () => {
    if (stage > 1){
      setStage(stage-1)
    }
    else {
      handleClose();
    }
  }

  const handleBuy = () => {
    if (size === null) return;
    handleClose();
  }

  const handleClose = () => {
    setStage(1);
    setType("poster");
    setSize(null);
    setColor("#2b2b2b");    
    onClose();
  }

  return (
    <>
      <div className="fixed w-[100%] h-[100%] bg-black/40 top-0 z-20 flex justify-center items-center">
        <div className="w-3/4 h-[calc(100%-80px)] bg-white border-gray-300 shadow-xl rounded-[30px] flex flex-col justify-start items-start overflow-hidden">          
          <div className="relative h-[calc(100%-100px)] w-full bg-[#EEEAE4]">
            <Canvas>
              <Scene />
            </Canvas>            
            <div className="absolute top-0 left-0 m-8 bg-white p-4 rounded-full cursor-pointer" onClick={handleBack}>
              <FaArrowLeft className="text-xl text-gray-600" />
            </div>
            <div className="absolute top-0 right-0 m-8 bg-white p-4 rounded-full group flex flex-col items-end justify-right transition hover:rounded-[27.5px]">
              <div>
              <LuRotate3D className="text-xl text-gray-600" />
              </div>
              <div className="w-32 hidden group-hover:block flex flex-col">
                <div className="text-sm font-semibold">Interactive Image:</div>
                <div className="text-sm">Rotate - Drag</div>
                <div className="text-sm">Zoom - Pinch</div>
                <div className="text-sm">Pan - Two fingers</div>
              </div>              
            </div>
            {stage === 1 && (
            <div className="absolute bottom-0 left-12">
              <h1 className="font-semibold text-5xl">{item.title}</h1>
              <h2 className="text-3xl">{item.author}</h2>            
              <h3 className="text-xl">{item.location}</h3>
            </div>
            )}
            {stage === 2 && (
              <div className="absolute top-[calc(50%-150px)] h-[300px] w-[220px] right-12 bg-white rounded-[10px] shadow-md flex flex-col p-4">
                <div className="grid grid-cols-2 grid-rows-2 gap-2">
                  <div className="flex flex-col justify-center items-center text-lg" onClick={() => setType("poster")}>
                    Poster
                    <img src="/ui/poster.png" className={`cursor-pointer ${type === "poster" && "border-black border-2"}`} />
                  </div>
                  <div className="flex flex-col justify-center items-center text-lg" onClick={() => setType("canvas")}>
                    Canvas
                    <img src="/ui/canvas.png" className={`cursor-pointer ${type === "canvas" && "border-black border-2"}`} />
                  </div>
                  <div className="flex flex-col justify-center items-center text-lg" onClick={() => setType("framed")}>
                    Framed
                    <img src="/ui/frame.jpg" className={`cursor-pointer ${type === "framed" && "border-black border-2"}`} />
                  </div>
                  <div className="flex flex-col justify-center items-center text-lg" onClick={() => setType("metallic")}>
                    Metallic
                    <img src="/ui/metal.jpg" className={`cursor-pointer ${type === "metallic" && "border-black border-2"}`} />
                  </div>
                </div>
              </div>
              )}
            {stage === 3 && (
              <div className="absolute top-[25%] h-[50%] right-12 bg-white rounded-[10px] shadow-md flex flex-col p-4">
                <div className="flex flex-col">
                  <h2 className={`text-lg font-semibold ${size !== null && "text-gray-500"}`}>Size</h2>
                  <div className="flex gap-2 bg-[#EEEAE4] h-10 rounded-[48px] px-2 items-center">
                    <div className={`flex justify-center items-center rounded-full bg-white cursor-pointer px-1 ${size === "s" && "border border-black"}`} onClick={() => setSize("s")}>
                      {orientation == "landscape" ? (
                          "17″x11″"
                        ) : (
                          "11″x17″"
                        )
                      }
                    </div>
                    <div className={`flex justify-center items-center rounded-full bg-white cursor-pointer px-1 ${size === "m" && "border border-black"}`} onClick={() => setSize("m")}>
                      {orientation == "landscape" ? (
                          "24″x18″"
                        ) : (
                          "18″x24″"
                        )
                      }
                    </div>
                    <div className={`flex justify-center items-center rounded-full bg-white cursor-pointer px-1 ${size === "l" && "border border-black"}`} onClick={() => setSize("l")}>
                      {orientation == "landscape" ? (
                          "36″x24″"
                        ) : (
                          "24″x36″"
                        )
                      }
                    </div>
                  </div>
                  {type === "framed" && (
                    <>
                    <h2 className={`text-lg font-semibold pt-4 ${color !== null && "text-gray-500"}`}>Color</h2>
                    <div className="flex items-center rounded-[20px] h-12 bg-[#EEEAE4] gap-2 px-2">
                      {/*
                      <div className="rounded-full bg-yellow-500 w-8 h-8 cursor-pointer" onClick={() => setColor("yellow")}></div>
                      <div className="rounded-full bg-red-500 w-8 h-8 cursor-pointer" onClick={() => setColor("red")}></div>
                      <div className="rounded-full bg-blue-500 w-8 h-8 cursor-pointer" onClick={() => setColor("blue")}></div>
                      <div className="rounded-full bg-green-500 w-8 h-8 cursor-pointer" onClick={() => setColor("green")}></div>
                      */}
                      <div className="rounded-full bg-[#2b2b2b] w-8 h-8 cursor-pointer flex justify-center items-center" onClick={() => setColor("#2b2b2b")}>
                        {color === "#2b2b2b" && (
                          <TiTick className="text-white text-xl"/>
                        )}
                      </div>                      
                      <div className="rounded-full bg-[#4a4a4a] w-8 h-8 cursor-pointer flex justify-center items-center" onClick={() => setColor("#4a4a4a")}>
                        {color === "#4a4a4a" && (
                          <TiTick className="text-white text-xl"/>
                        )}
                      </div>
                      <div className="rounded-full bg-[#6b4226] w-8 h-8 cursor-pointer flex justify-center items-center" onClick={() => setColor("#6b4226")}>
                        {color === "#6b4226" && (
                          <TiTick className="text-white text-xl"/>
                        )}
                      </div>
                      <div className="rounded-full bg-[#c2a670] w-8 h-8 cursor-pointer flex justify-center items-center" onClick={() => setColor("#c2a670")}>
                        {color === "#c2a670" && (
                          <TiTick className="text-white text-xl"/>
                        )}
                      </div>
                      <div className="rounded-full bg-[#1b2a49] w-8 h-8 cursor-pointer flex justify-center items-center" onClick={() => setColor("#1b2a49")}>
                        {color === "#1b2a49" && (
                          <TiTick className="text-white text-xl"/>
                        )}
                      </div>
                      <div className="rounded-full bg-[#2e4d38] w-8 h-8 cursor-pointer flex justify-center items-center" onClick={() => setColor("#2e4d38")}>
                        {color === "#2e4d38" && (
                          <TiTick className="text-white text-xl"/>
                        )}
                      </div>
                    </div>
                    </>
                  )} 
                </div>
              </div>
            )}
          </div>          
          <div className="h-[100px] w-full bg-[#EEEAE4] p-4">
            <div className="bg-white w-full h-full flex justify-between rounded-lg">
              <div className="flex justify-center items-center">
                <div className={`relative h-full w-48 flex justify-center items-center cursor-pointer ${stage === 1 && "border-b-2 border-black"}`} onClick={() => setStage(1)}>
                  01. DESCRIPTION
                </div>
                <div className={`relative h-full w-48 flex justify-center items-center cursor-pointer ${stage === 2 && "border-b-2 border-black"}`} onClick={() => setStage(2)}>
                  02. OPTIONS
                </div>
                <div className={`relative h-full w-48 flex justify-center items-center cursor-pointer ${stage === 3 && "border-b-2 border-black"}`} onClick={() => setStage(3)}>
                  03. CUSTOMIZE
                </div>              
              </div>
              <div className="flex gap-4 p-2">
              <Button variant={"outline"} className="h-full w-32" onClick={handleLike}>
                Like 
                {!liked && (
                  <FaRegHeart />
                )}              
                {liked && (
                  <FaHeart className="text-red-500"/>
                )}  
              </Button>
              {stage < 3 && (
                <Button className="h-full w-32" onClick={handleStage}>Next  <FaArrowRight /></Button>
              )}
              {stage == 3 && (
                <Button className={`h-full w-32 ${size === null && "bg-gray-300 hover:bg-gray-300 cursor-default"}`} onClick={handleBuy}>Add to cart <FaCartShopping /></Button>
              )}
              </div>
            </div>
          </div>
        </div>
      </div>
    {/*
      <div className="fixed w-[100%] h-[100%] bg-black/40 top-0 z-20 flex justify-center items-center">
        <div className="w-3/4 h-3/4 bg-white border-gray-300 rounded-[30px] shadow-xl flex flex-col justify-start items-start overflow-hidden">
          <div className="relative px-12 w-full h-[60%] bg-gray-100">
            <div className="left-0 absolute w-full h-full">              
              <Canvas>
                <Scene />
              </Canvas>              
            </div>
            <div className="absolute top-0 right-0 m-4 px-2 py-2 border border-gray-700 rounded-full text-[#111111] hover:text-gray-900 hover:bg-white hover:border-gray-600 cursor-pointer" onClick={onClose}>
              <IoMdClose />
            </div>
          </div>
          <div className="w-full h-[40%] bg-gray-200 p-8">
            <div className="flex h-full gap-16">            
              <div className="flex flex-col justify-between w-1/3">
                <div className="flex flex-col">
                  <h1 className="font-semibold text-5xl">{item.title}</h1>
                  <h2 className="text-3xl">{item.author}</h2>            
                  <h3 className="text-xl">{item.location}</h3>
                  <div className="border rounded-full flex justify-center items-center px-2 shadow-sm w-8 h-8 border-gray-400">
                  {!liked && (
                    <FaRegHeart className="text-gray-400 hover:text-red-500 cursor-pointer" onClick={likeHandler}/>
                  )}
                  {liked && (
                    <FaHeart className="text-red-500 hover:text-gray-400 cursor-pointer" onClick={likeHandler}/>
                  )}
                  </div>
                </div>                
              </div>

              <div className="flex flex-col gap-2 items-center w-1/3">
                <h2 className="text-3xl font-semibold">Options</h2>
                <div className="grid grid-cols-2 grid-rows-2 w-full h-full gap-2">
                  <div className="flex justify-center items-center border border-gray-300 bg-white rounded-lg text-xl font-semibold">Poster</div>
                  <div className="flex justify-center items-center border border-gray-300 bg-white rounded-lg text-xl font-semibold">Canvas</div>
                  <div className="flex justify-center items-center border border-gray-300 bg-white rounded-lg text-xl font-semibold">Framed</div>
                  <div className="flex justify-center items-center border border-gray-300 bg-white rounded-lg text-xl font-semibold">Metallic</div>
                </div>
              </div>

              <div className="flex flex-col justify-between items-center w-1/3">              
                <div className="flex flex-col gap-4 items-start">
                    {item.salePrice && (
                      <span className="text-gray-400 text-2xl"><s>${item.salePrice}</s></span>
                    )}                    
                    <div className="flex gap-2 items-end">
                      <span className="font-semibold text-4xl">${item.price}</span>
                      {item.salePrice && (            
                        <span className="font-semibold text-[#1a89ff] text-xl">{((1 - item.price / item.salePrice).toFixed(2)).toString().substring(2)}% off</span>
                      )}
                    </div>                  
                </div>
                <div className="flex gap-8">
                  <Button variant={"outline"} size={"lg"}> Add to cart </Button>
                  <Button size={"lg"} className="bg-[#007BFF] hover:bg-[#1a89ff]">Buy Now</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    */}
    </>
  )
}