import { useEffect, useState } from "react"; 
import LandscapeItem from "@/components/landscapeItem";
import PortraitItem from "@/components/portraitItem";
import Modal from "@/components/modal";

const ItemArea = ({ items }) => {  

  const [item, setItem] = useState(items[0]);
  const [modalActive, setModalActive] = useState(false);

  const resetItem = () => {
    console.log("close");
    setModalActive(false);
    setItem(null);
  }

  const handleModal = (index) => {
    console.log("Item clicked:", index);
    setItem(items[index]);
    setModalActive(true);
  }

  return (
    <>
      {items.map((item, index) => (
        item.orientation === "landscape" ? (          
          <LandscapeItem 
            key={index} 
            {...item} 
            handleClick={() => handleModal(index)}
            />          
        ) : (
          <PortraitItem 
            key={index} 
            {...item} 
            handleClick={() => handleModal(index)}
            />
        )
      ))}      
      {modalActive && (
        <Modal item={item} onClose={resetItem}/>
      )}      
    </>
  )
}

export default ItemArea;