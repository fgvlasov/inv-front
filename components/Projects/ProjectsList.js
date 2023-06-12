import ProjectItem from "@/components/ui/ProjectItem";
import Tag from "@/components/ui/Tag";
import ProjectImage from "@/components/Projects/ProjectImage";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ProjectItemWork from "../ui/ProjectItemWork";
import ProjectItemImage from "../ui/ProjectItemImage";
import Loading from "../ui/Loading";
import { getStrapiMedia } from "lib/media";
import ProjectsTitle from "./ProjectsTitle";
import Marquee from "../ui/Marquee";

export default function ProjectsList({ projects, moreProjects }) {
  //console.log(projects[0].attributes.tags.data[1]);
  if (!projects) {
    return <Loading />;
  }
  return (
    <section className="bg-whisper rounded-5xl pb-6 pt-16 md:pt-[60px] text-blackRussian md:pb-12 lg:pt-36 lg:pb-9 lg:rounded-7xl">
      <div className="container">
        <div className="px-3.8 lg:px-24.5 lg:pb-20">
          <ProjectsTitle />
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 750: 1, 1024: 2 }}
            className="lg:max-w-[1746px] mx-auto"
          >
            <Masonry gutter="37px">
              {projects[0] &&
                projects.map((project, i) => (
                  <ProjectItemWork
                    key={project.id}
                    name={project.attributes.Title}
                  >
                    {project.attributes.tags.data[0] && (
                      <Tag
                        text1={project.attributes.tags.data[0].attributes.Name}
                        text2={
                          project.attributes.tags.data[1]
                            ? project.attributes.tags.data[1].attributes.Name
                            : ""
                        }
                      />
                    )}
                    <ProjectItemImage
                      link={getStrapiMedia(project.attributes.Poster)}
                      width="398"
                      height="302"
                      variant="imageBlock"
                    />
                  </ProjectItemWork>
                ))}
            </Masonry>
          </ResponsiveMasonry>
        </div>
      </div>
      <Marquee />
    </section>
  );
}
