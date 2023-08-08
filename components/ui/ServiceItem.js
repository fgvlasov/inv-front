import TitleH3 from "./TitleH3";
import { getStrapiMedia } from "lib/media";
import Image from "next/image";
import Link from "next/link";

export default function ServiceItem({
  title,
  subtitle,
  descriptionItem1,
  link,
  image = "",
}) {
  return (
    <div
      className={`w-full h-[33vw] mb-2.5 pt-9 px-9 rounded-5xl relative
    md:mb-5
    lg:mb-0 lg:mr-7 lg:last-of-type:mr-0`}
    >
      <Link href={link}>
        <TitleH3 text={title} subtext={subtitle} />
        <p
          className="relative z-10 text-lg w-9/12 pt-7
      md:mt-9"
        >
          {descriptionItem1}
        </p>
        {image && (
          <div
            className="
      lg:max-w-full lg:min-w-fit"
          >
            <Image
              src={getStrapiMedia(image)}
              alt={title}
              width="398"
              height="600"
              quality={100}
              className="object-cover w-full
        h-full rounded-5xl"
            />
          </div>
        )}
      </Link>
    </div>
  );
}
