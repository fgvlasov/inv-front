import TitleSection from "@/components/ui/TitleSection";
import BreadCrumbs from "@/components/ui/Breadcrumbs";
import TagItemSection from "@/components/ui/TagItemSection";

export default function IntroProjects() {
  return (
    <div
      className="pb-15
    md:pb-[28px]"
    >
      <TitleSection text="Портфолио" />
      <BreadCrumbs
        item1="Главная"
        link1="/index"
        // itemLast={projects.attributes.Title}
        itemLast="Портфолио"
      />
      <div className="flex flex-wrap md:w-4/5">
        <TagItemSection text="Архитектурная 3D визуализация" color="blue" />
        <TagItemSection text="Продуктовая 3D визуализация" color="white" />
        <TagItemSection text="Моушн & Видеопродакшн" color="white" />
        <TagItemSection text="3D моделирование" color="white" />
      </div>
    </div>
  );
}
