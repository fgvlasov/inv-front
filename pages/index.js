import Layout from '@/components/layout';
import { fetchAPI } from 'lib/api';
import ServicesAbout from '@/components/Services/ServicesAbout';
import BlogsBlockList from '@/components/Blogs/BlogsBlockList';
import ServicesListHome from '@/components/Services/ServicesListHome';
import Line from '@/components/ui/Line';
import Wrapper from '@/components/ui/Wrapper';
import ProjectsListForMain from '@/components/Projects/ProjectsListForMain';
import Seo from '@/components/seo';

const Home = ({
  projects,
  services,
  servicesAbout,
  about,
  blogs,
  global,
  data,
  menu,
  headerMenu,
}) => {
  const seo = {
    metaTitle: global.attributes.defaultSeo.metaTitle,
    metaDescription: global.attributes.defaultSeo.metaDescription,
    //shareImage: global.Logo,
  };

  return (
    <Layout
      headerContact={data.attributes}
      data={data}
      menu={menu}
      header={headerMenu}
      bg="black"
      headerBg="black"
      footerBg="black"
      pillowColor="dark"
      variantSvg="darkSvg"
    >
      <Seo seo={seo} />
      <ServicesAbout about={about} servicesAbout={servicesAbout} />
      <ServicesListHome services={services} />
      <Wrapper color="grey" position="top">
        <ProjectsListForMain projects={projects} moreProjects={true} />
      </Wrapper>
      <BlogsBlockList
        articleColor="nero"
        titleColor="white"
        buttonColor="white"
        blogRes={blogs}
      />
      <div className="container">
        <Line variantColor="eclipse" />
      </div>
    </Layout>
  );
};

export async function getStaticProps({ locale }) {
  const [
    headerRes,
    contactRes,
    menuRes,
    projectsRes,
    servicesRes,
    servicesAboutRes,
    aboutRes,
    blogRes,
    globalRes,
  ] = await Promise.all([
    fetchAPI('/navigation/render/2', {
      fields: ['title', 'path'],
      locale: locale,
    }),
    fetchAPI('/contact', {
      fields: ['Title', 'Address', 'Phone', 'Email', 'PhoneLink'],
      locale: locale,
      populate: 'ContactSocials',
    }),
    fetchAPI('/navigation/render/3', {
      fields: ['title', 'path'],
      locale: locale,
    }),
    fetchAPI('/projects', {
      sort: ['ListPosition:asc'],
      populate: {
        Poster: '*',
        Poster_for_mainPage: '*',
        tags: '*',
      },
      fields: ['title', 'slug'],
      locale: locale,
      filters: {
        ShowOnMainPage: true,
        publishedAt: { ne: null },
      },
      publicationState: 'live',
      pagination: {
        start: 0,
        limit: 8,
      },
    }),
    fetchAPI('/categories', {
      populate: ['image'],
      fields: ['name', 'slug', 'textPart1', 'textPart2'],
      locale: locale,
      publicationState: 'live',
      filters: {
        ShowOnMainPage: true,
      },
      pagination: {
        start: 0,
        limit: 3,
      },
    }),
    fetchAPI('/categories', {
      filters: {
        ShowAsSlide: true,
      },
      fields: ['name', 'slug'],
      locale: locale,
      publicationState: 'live',
      populate: {
        Slides: {
          sort: ['SlidePosition:asc'],
          populate: '*',
        },
        imagePresentationLink: '*',
      },
    }),
    fetchAPI('/about', {
      fields: ['SloganPart1', 'SloganPart2'],
      populate: ['Video'],
      locale: locale,
    }),
    fetchAPI('/blogs', {
      fields: ['Title', 'slug', 'Preview'],
      populate: ['tag', 'Image_preview'],
      locale: locale,
      publicationState: 'live',
    }),
    fetchAPI('/global', {
      //fields: ["Logo"],
      populate: ['defaultSeo'],
      locale: locale,
    }),
  ]);

  return {
    props: {
      projects: projectsRes.data,
      services: servicesRes.data,
      servicesAbout: servicesAboutRes.data,
      about: aboutRes.data,
      blogs: blogRes.data,
      global: globalRes.data,
      data: contactRes.data,
      menu: menuRes,
      headerMenu: headerRes,
    },
    revalidate: 60,
  };
}

export default Home;
