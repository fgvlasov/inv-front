import ProjectItemWork from "@/components/ui/ProjectItemWork";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ProjectItemImage from "@/components/ui/ProjectItemImage";
import Tag from "@/components/ui/Tag";

export default function ProjectWorks() {
  return (
    <div className="container lg:max-w-[1746px]">
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 750: 1, 1024: 2 }}
        className="pt-1.5 pb-15"
      >
        <Masonry gutter="37px">
          <ProjectItemWork name="Екатерининская улица Мурино">
            <Tag text1="3D анимация" text2="МОДЕЛИРОВАНИЕ" />
            <ProjectItemImage
              link="/image/content/murino-14.png"
              width="398"
              height="302"
              variant="imageBlock"
            />
          </ProjectItemWork>

          <ProjectItemWork name="Жилой комплекс «ТАЙМ»">
            <Tag text1="3D анимация" text2="МОДЕЛИРОВАНИЕ" />
            <ProjectItemImage
              link="/image/content/time.png"
              width="398"
              height="557"
              variant="imageBlock"
            />
          </ProjectItemWork>
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
}
