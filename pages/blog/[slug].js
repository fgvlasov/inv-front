import Layout from "@/components/layout";
import TitleSection from "@/components/ui/TitleSection";
import useTranslation from "next-translate/useTranslation";
import Line from "@/components/ui/Line";
import BreadCrumbs from "@/components/ui/Breadcrumbs";
import IntroNews from "@/components/News/IntroNews";
import CarouselNews from "@/components/News/CarouselNews";
import { fetchAPI } from "lib/api";
import Seo from "@/components/seo";
import QuoteBlock from "@/components/News/QuoteBlock";
import ReactMarkdown from "react-markdown";
import LoadFileBlock from "@/components/News/LoadFileBlock";
import BlogsBlockList from "@/components/Blogs/BlogsBlockList";
import Video from "@/components/Projects/Video";

export default function Blog({ blog, blogsOthers, data, menu, headerMenu }) {
  const { t } = useTranslation("common");

  const seo = {
    metaTitle: blog.attributes.Title,
    metaDescription: blog.attributes.Text,
    shareImage: blog.attributes.Image_preview,
  };

  const breadCrumbsItems = [
    {
      title: t("All_news"),
      path: "/news",
    },
    {
      title: blog.attributes.Title,
    },
  ];

  return (
    <Layout bg="white" headerBg="white" footerBg="white" pillowColor="" data={data}
      menu={menu}
      header={headerMenu}
      headerContact={data.attributes}>
      <Seo seo={seo} />
      <TitleSection text={blog.attributes.Title} />
      <Line variantColor="grey" />
      <BreadCrumbs links={breadCrumbsItems} />
      <IntroNews blog={blog} />
      {blog.attributes.Text && (
        <ReactMarkdown className=" container pt-12 !max-w-screen-lg markDown opacityMarkdown">
          {blog.attributes.Text}
        </ReactMarkdown>
      )}

      {blog.attributes.Advertise && (
        <div className="container pt-12 !max-w-screen-lg">
          <ReactMarkdown className=" !max-w-screen-lg markDown opacityMarkdown">
            {blog.attributes.Advertise}
          </ReactMarkdown>
        </div>
      )}
      {blog.attributes.PhotoSlides && (
        <CarouselNews slides={blog.attributes.PhotoSlides} blog={blog} />
      )}
      {blog.attributes.Text2 && (
        <ReactMarkdown className=" container pt-12 !max-w-screen-lg markDown opacityMarkdown">
          {blog.attributes.Text2}
        </ReactMarkdown>
      )}
      {blog.attributes.File?.data && (
        <LoadFileBlock file={blog.attributes.File.data} />
      )}
      {blog.attributes.Quote && <QuoteBlock quote={blog.attributes.Quote} />}

      {blog.attributes.Video?.data && (
        <div className="pt-[52px]">
          <Video
            poster={blog.attributes.Poster}
            videofile={blog.attributes.Video}
          />
        </div>
      )}

      {blog.attributes.Text3 && (
        <ReactMarkdown className=" container pt-12 !max-w-screen-lg markDown opacityMarkdown">
          {blog.attributes.Text3}
        </ReactMarkdown>
      )}
      <BlogsBlockList
        articleColor="inherit"
        titleColor="black"
        buttonColor="black"
        blogRes={blogsOthers}
        titleOthers={true}
      />
      <Line variantColor="grey" />
    </Layout>
  );
}

export async function getStaticPaths() {
  const blogsRes = await fetchAPI("/blogs", {
    fields: ["slug"],
    pagination: {
      pageSize: 100,
    },
  },
  );

  const blogPaths = blogsRes.data.map((blog) => ({
    params: {
      slug: blog.attributes.slug,
    },
  }));

  return {
    paths: [...blogPaths],
    fallback: false,
  };
}

export async function getStaticProps({ params, locale }) {
  const [headerRes,
    contactRes,
    menuRes, matchingBlogs, blogsOthersRes] = await Promise.all([
      fetchAPI("/navigation/render/2", {
        fields: ["title", "path"],
        locale: locale,
      }),
      fetchAPI("/contact", {
        fields: ["Title", "Address", "Phone", "Email", "PhoneLink"],
        locale: locale,
        populate: "ContactSocials",
      }),
      fetchAPI("/navigation/render/3", {
        fields: ["title", "path"],
        locale: locale,
      }),
      fetchAPI("/blogs", {
        filters: { slug: params.slug },
        locale: locale,
        publicationState: "live",
        populate: "*",
      }),
      fetchAPI("/blogs", {
        fields: ["Title", "slug", "Preview"],
        populate: ["tag", "Image_preview"],
        pagination: {
          start: 0,
          limit: 3,
        },
        publicationState: "live",
        locale: locale,
      }),
    ]);
  const blog = matchingBlogs.data.length > 0 ? matchingBlogs.data[0] : null;

  return {
    props: {
      data: contactRes.data,
      menu: menuRes,
      headerMenu: headerRes,
      blog,
      blogsOthers: blogsOthersRes.data,
    },
    revalidate: 3600,
  };
}

