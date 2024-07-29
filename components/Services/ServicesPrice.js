import Accordion from '../ui/Accordion';
import { getStrapiMedia } from 'lib/media';

export default function ServicesPrice({ data }) {
  if (!data) {
    return;
  }

  const items = [
    {
      title: data.Project_price_title_1,
      text: data.Project_price_text_1,
    },
    {
      title: data.Project_price_title_2,
      text: data.Project_price_text_2,
    },
    {
      title: data.Project_price_title_3,
      text: data.Project_price_text_3,
    },
    {
      title: data.Project_price_title_4,
      text: data.Project_price_text_4,
    },
    {
      title: data.Project_price_title_5,
      text: data.Project_price_text_5,
    },
  ];

  //console.log(data);
  return (
    <section className="container mt-10">
      <h1 className="mb-7 text-3.5xl w-full md:w-[335px] text-black-russian3 font-arial font-normal lg:text-4xl lg:w-full">
        {data.Title}
      </h1>
      <div className="block lg:flex lg:flex-row-reverse lg:mt-15">
        <Accordion items={items} />
        <div
          alt="#"
          className="w-[100%] rounded-2xl h-[255px] bg-cover bg-no-repeat mt-5 md:h-[400px] md:mt-10 lg:h-[415px] lg:mt-0 lg-w-[857px] lg:mr-7"
          style={{
            backgroundImage: `url(${getStrapiMedia(data.Project_price_image)})`,
            backgroundPosition: 'center',
          }}
        />
      </div>
    </section>
  );
}
