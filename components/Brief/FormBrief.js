import TagsBrief from "./TagsBrief";
import sendBrief from "lib/sendBrief";
import Link from "next/link";
import TagsBriefDirection from "./TagsBriefDirection";
import { AggregateForm } from "./Forms/AggregateForm";
import { getCategoryProject } from "lib/getCategoryProject";
import { useContext, useEffect, useState, useMemo, useRef } from "react";
import { ToastrContext } from "../Toastr/ToastrProvider";
import { useEnquiryForm } from "lib/useEnquiryForm";
import { useSearchParams } from "next/navigation";

export default function FormBrief({ visobjs, categories }) {
  const checkUser = useEnquiryForm();
  const searchParams = useSearchParams();
// берем из URL, если есть
  const urlCategoryId = searchParams.get("categoryId");
  const urlDirectionId = searchParams.get("directionId");

  // В СТЕЙТЕ храним ТОЛЬКО ID
  const [categoryId, setCategoryId] = useState();
  const [directionId, setDirectionId] = useState();
  const [loading, setLoading] = useState(false);

  const { setOpen, setSuccess, setMessage, Confirmation_Form_Brief } =
    useContext(ToastrContext);

  const openSuccessToast = () => {
    setMessage(Confirmation_Form_Brief);
    setSuccess(true);
    setOpen(true);
  };
  const openErrorToast = () => {
    setSuccess(false);
    setOpen(true);
  };

  // На основе id находим объекты (мемоизировано)
  const category = useMemo(
    () => categories?.find((c) => String(c.id) === String(categoryId)),
    [categories, categoryId]
  );
  const projectType = useMemo(() => {
    // Если направления тоже лежат в categories, найдём по id
    return categories?.find((c) => String(c.id) === String(directionId));
  }, [categories, directionId]);

  const send = async (data) => {
    setLoading(true);
    try {
      const sendData = {
        ...data,
        categories: category, // объект категории
        ProjectType: projectType?.attributes?.name, // имя направления
      };
      const isUser = await checkUser();
      if (isUser) {
        await sendBrief(sendData);
        openSuccessToast();
      } else {
        openErrorToast();
      }
    } catch (error) {
      openErrorToast();
    } finally {
      setLoading(false);
    }
  };

  // Смена категории по клику: ставим id и сбрасываем выбранное направление
  const onCategoryChange = (newCategoryId) => {
    setCategoryId(newCategoryId);
  };
  const onDirectionChange = (newDirectionId) => {
    setDirectionId(newDirectionId);
  };

  // Инициализация из URL один раз (чтобы не перетирать выбор пользователя)
  const initializedRef = useRef(false);
  useEffect(() => {
    if (initializedRef.current) return;

    // Если есть helper getCategoryProject, можно им воспользоваться.
    // Но он должен возвращать именно id. Если возвращает объекты — возьмём их id.
    const { selectCategory, selectProject } = getCategoryProject(
      urlCategoryId,
      urlDirectionId,
      categories
    ) || { selectCategory: undefined, selectProject: undefined };

    const initialCategoryId =
      (selectCategory && selectCategory.id) ?? urlCategoryId ?? undefined;
    const initialDirectionId =
      (selectProject && selectProject.id) ?? urlDirectionId ?? undefined;

    if (initialCategoryId != null) setCategoryId(initialCategoryId);
    if (initialDirectionId != null) setDirectionId(initialDirectionId);

    initializedRef.current = true;
  }, [urlCategoryId, urlDirectionId, categories]);

  return (
    <>
      <div className="container">
        <p
          className="pt-7
      md:text-1xl md:w-2/3 md:leading-7
      xl:w-full"
        >
          Оставьте заявку, либо звоните, мы пообщаемся и сами все за вас
          заполним:
          <Link href="tel:+78129092533">
            {" "}
            8&nbsp;(812)&nbsp;909-25-33
          </Link>
        </p>
        <TagsBrief
        title="Выберите услугу"
        categories={categories}
        category_id={categoryId}
        setCategory_id={onCategoryChange}
      />

      <TagsBriefDirection
        title="Направление"
        category_id={categoryId}
        direction={directionId}
        setDirection={onDirectionChange}
      />
        <AggregateForm
          loading={loading}
          send={send}
          projectType={projectType}
          category={category}
        />
      </div>
    </>
  );
}
