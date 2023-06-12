import setLanguage from "next-translate/setLanguage";
import useTranslation from "next-translate/useTranslation";

export default function Language() {
  const i18n = useTranslation();
  return (
    <div
      className="flex flex-row items-center ml-auto pr-2.5 md:order-2 lg:order-none lg:ml-0
     lg:mr-auto trans-default"
    >
      <button
        type="button"
        onClick={async () => await setLanguage("ru")}
        className={`hover:text-suva-grey lg:block ${
          i18n.lang === "en" ? " mr-3.8" : " text-suva-grey "
        }`}
      >
        RU
      </button>
      <button
        type="button"
        onClick={async () => await setLanguage("en")}
        className={`hover:text-suva-grey lg:block ${
          i18n.lang === "ru" ? " ml-3.8" : " text-suva-grey"
        }`}
      >
        EN
      </button>
      <svg
        className="fill-gray ml-2.5 lg:hidden"
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="5"
        viewBox="0 0 10 5"
      >
        <path fillRule="evenodd" clipRule="evenodd" d="m0 0 5 5 5-5H0Z" />
      </svg>
    </div>
  );
}
