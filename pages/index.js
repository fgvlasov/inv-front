import React from "react";
import Layout from "../components/layout";
import {fetchAPI} from "../lib/api";
import About from '../components/pages/index/About';
import Projects from '../components/pages/index/Projects';
import Blog from '../components/pages/index/Blog';
import Services from '@/components/pages/index/Services';

const Home=({projects, services}) => {
  return (
    <Layout>
      <div className="mx-auto py-6">
        <About />
        <Services services={services} /> 
        <Projects projects={projects} moreProjects={true}/>
        <Blog />
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  // Run API calls in parallel
  const [projectsRes, servicesRes]=await Promise.all([

    fetchAPI("/projects", {
		sort: ['ListPosition:asc'],
		populate: "*",
		fields: ['id', 'title', 'Poster', 'slug', 'AspectRatioMobile', 'AspectRatioTab', 'AspectRatioDesktop', 'VariantImageList', 'VariantColorList'],
		filters: {
			ShowOnMainPage: true
		}
	}),
	fetchAPI("/categories", { 
		populate: "*",
		fields: ['name', 'image', 'slug', 'text'],
		filters: {
			ShowOnMainPage: true
		} 
	})

  ]);

  return {
    props: {
      projects: projectsRes.data,
      services: servicesRes.data,
    },
    revalidate: 1,
  };
}

export default Home;