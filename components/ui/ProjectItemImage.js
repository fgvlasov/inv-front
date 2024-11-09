import Image from "next/image"
import { useState } from 'react'

export default function ProjectItemImage({ link, width, height, variant }) {
  let [loaded, setLoaded] = useState(false)
  if (variant === "imageBlock") {
    return (
      <div className="absolute top-0 bottom-0 left-0 right-0">
        <Image
          className={`w-full h-full obj rounded-l15`}
          style={{
            filter: !loaded ? "blur(70px)" : "none",
            transition: "filter 0.2s ease-out",
          }}
          src={link}
          width={width}
          height={height}
          alt="Project name"
          onLoad={() => setLoaded(true)}
        />
      </div>
    );
  }
  return (
    <div className={`w-[${width}px] absolute top-[50%] left-[50%] -translate-x-2/4 -translate-y-1/2 md:top-[45%]`}>
      <Image
        className={`w-full h-full obj rounded-l15`}
        style={{
          filter: !loaded ? "blur(70px)" : "none",
          transition: "filter 0.2s ease-out",
        }}
        src={link}
        width={width}
        height={height}
        alt="Project name"
      />      
    </div>
  );
}
