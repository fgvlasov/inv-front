import Layout from "@/components/layout";
import Wrapper from "@/components/ui/Wrapper";
import Line from "@/components/ui/Line";
import IntroError from "@/components/ui/IntroError";
import ServicesSlides from "@/components/Services/ServicesSlides";
import { fetchAPI } from "lib/api";

export default function ErrorPage({ data, menu, headerMenu }) {

  return (
    <Layout
      headerContact={data.attributes}
      data={data}
      menu={menu}
      header={headerMenu}
      bg="grey"
      headerBg="black"
      footerBg="white"
      pillowColor={"grey"}
      variantSvg="darkSvg"
    >

      <Wrapper color="black" position="bottom">
        <IntroError />
      </Wrapper>
      <div className="py-3.8 container contRightFull">
        <ServicesSlides />
      </div>
      <div className="container">
        <Line variantColor="grey" />
      </div>
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  const [
    headerRes,
    contactRes,
    menuRes,

  ] = await Promise.all([
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
  ]);

  return {
    props: {
      data: contactRes.data,
      menu: menuRes,
      headerMenu: headerRes,
    },
    revalidate: 3600,
  };
}