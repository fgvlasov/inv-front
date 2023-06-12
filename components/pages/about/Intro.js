import BreadCrumbs from "../../ui/Breadcrumbs";
// import Tag from './Tag';
// import IntroButton from './IntroButton';
// import IntroItem from './IntroItem';
import IntroSlides from "../../ui/IntroSlides";
import IntroDescription from "../../ui/IntroDescription";
import IntroCost from "@/components/ui/IntroCost";
import useTranslation from "next-translate/useTranslation";
import TitleSection from "@/components/ui/TitleSection";

export default function Intro({ info }) {
  const { t } = useTranslation("common");
  return (
    <div className="container  px-3.8 lg:max-w-[1746px]">
      <TitleSection text={info.attributes.Title} />
      <BreadCrumbs itemLast={info.attributes.Title} />
      <div className="lg:flex flex-wrap justify-between pb-15">
        <IntroDescription
          title={t(`about.aboutPurpose`)}
          text={info.attributes.AboutPurpose}
        ></IntroDescription>
        <IntroSlides />
        <IntroDescription
          title={t(`about.aboutOpportunities`)}
          text={info.attributes.AboutOpportunities}
        ></IntroDescription>
      </div>

      <IntroCost />
    </div>
  );
}
