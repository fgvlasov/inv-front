import Seo from "@/components/seo";
import Layout from "@/components/layout";
import Image from "next/image";
import { fetchAPI } from "lib/api";
import { getStrapiMedia } from "lib/media";

function Project({ project, categories }) {
  const imageUrl = getStrapiMedia(project.attributes.Poster);
  console.log(project);

  const seo = {
    metaTitle: project.attributes.Title,
    metaDescription: project.attributes.Description,
    shareImage: project.attributes.Poster,
    project: true,
  };

  return (
    <Layout bg="white" headerBg="white" footerBg="black">
      <Seo seo={seo} />
      <h1>{project.attributes.Title}</h1>
      {project.attributes.Description && (
        <div>{project.attributes.Description}</div>
      )}
      <Image
        width="230"
        height="322"
        src={imageUrl}
        alt={project.attributes.Title}
      />
    </Layout>
  );
}

export async function getStaticPaths() {
  const projectsRes = await fetchAPI("/projects", { fields: ["slug"] });

  return {
    paths: projectsRes.data.map((project) => ({
      params: {
        slug: project.attributes.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const projectsRes = await fetchAPI("/projects", {
    filters: {
      slug: params.slug,
    },
    populate: "*",
  });
  const categoriesRes = await fetchAPI("/categories");

  return {
    props: { project: projectsRes.data[0], categories: categoriesRes },
    revalidate: 1,
  };
}

export default Project;
