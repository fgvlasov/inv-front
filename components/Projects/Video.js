import { getStrapiMedia } from "lib/media";
import Image from "next/image";
import { VideoPlayer } from "./VideoPlayer";

export default function Video({ poster, videofile, small = false }) {
  return (
    //<div className='bg-[url("../public/image/content/video.png")] bg-no-repeat bg-center bg-cover w-full min-h-[561px] relative mt-2.5 md:aspect-square'>
    <div className="w-full relative">
      {videofile?.data ? (
        <VideoPlayer poster={poster} videofile={videofile} small={small} />
      ) : (
        <Image
          className="w-full rounded-lr h-full"
          src={getStrapiMedia(poster)}
          width="266"
          height="151"
          alt=""
        />
      )}
    </div>
  );
}
