"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

const ExploreAnimatedCard = ({ images, title, desc, href }) => {
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      const element = document.querySelector('.card-container');
      if (element) {
        setContainerDimensions({
          width: element.clientWidth,
          height: element.clientHeight
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const calculateImageDimensions = (originalWidth, originalHeight, maxHeight) => {
    const maxImageWidth = containerDimensions.width * 0.4; // 40% of container width
    const aspectRatio = originalWidth / originalHeight;

    // Use the maxHeight passed in (which accounts for spacing)
    let newHeight = maxHeight;
    let newWidth = maxHeight * aspectRatio;

    // If width exceeds max width, scale down proportionally
    if (newWidth > maxImageWidth) {
      newWidth = maxImageWidth;
      newHeight = maxImageWidth / aspectRatio;
    }

    return { width: Math.round(newWidth), height: Math.round(newHeight) };
  };

  const calculateImagePositions = (images) => {
    if (!containerDimensions.height || !images.length) return [];

    // Calculate available space
    const totalSpace = containerDimensions.height - 40; // Subtract padding
    const minSpacing = 20; // Minimum pixels between images
    
    // Calculate max height per image including spacing
    const maxHeightPerImage = Math.min(
      (totalSpace - (minSpacing * (images.length - 1))) / images.length,
      containerDimensions.height * 0.25 // Max 25% of container height
    );

    let currentTop = 20; // Start with padding
    
    return images.map((img, index) => {
      const dimensions = calculateImageDimensions(img.width, img.height, maxHeightPerImage);
      const position = {
        ...dimensions,
        top: currentTop,
        delay: img.delay,
        href: img.href
      };
      
      // Update currentTop for next image
      currentTop += dimensions.height + minSpacing;
      
      return position;
    });
  };

  if (!images) return null;

  const imagePositions = calculateImagePositions(images);

  return (
    <Link href={href} className="w-full h-full flex flex-col items-center p-6 relative overflow-hidden card-container">
      {/* Background Images */}
      {containerDimensions.height > 0 && imagePositions.map((img, index) => (
        <div
          key={index}
          className="absolute left-0 right-0"
          style={{
            top: `${img.top}px`,
          }}
        >
          <div 
            className="sliding-image absolute"
            style={{
              animationDelay: `${img.delay}s`,
              width: '100%',
              height: `${img.height}px`,
            }}
          >
            <img
              src={img.href}
              alt="sliding background"
              className="opacity-90 absolute left-0"
              style={{
                height: `${img.height}px`,
                width: `${img.width}px`,
              }}
            />
          </div>
        </div>
      ))}
      
      {/* Content */}
      <div className="w-full h-full flex flex-col justify-center items-center z-10 relative">
        <h1 className="text-[#111111] text-3xl font-semibold">{title}</h1>
        <p className="text-center">{desc}</p>
      </div>

      <style jsx>{`
        @keyframes slideAcross {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .sliding-image {
          animation: slideAcross 10s linear infinite;
        }
      `}</style>
    </Link>
  );
};

export default ExploreAnimatedCard;