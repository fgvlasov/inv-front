import Accordion from '../ui/Accordion';

const items = [
  {
    title: 'Lorem ipsum dolor',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  },
  {
    title: 'Lorem ipsum dolor',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  },
  {
    title: 'Lorem ipsum dolor',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  },
  {
    title: 'Lorem ipsum dolor',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  },
  {
    title: 'Lorem ipsum dolor',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  },
];

export default function ServicesPrice() {
  return (
    <section className="container mt-10">
      <h1 className="mb-7 text-3.5xl w-full md:w-[335px] text-black-russian3 font-arial font-normal lg:text-4xl lg:w-full">
        Из чего складывается цена проекта?
      </h1>
      <div className="block lg:flex lg:flex-row-reverse lg:mt-15">
        <Accordion items={items} />
        <div
          alt="#"
          className="w-[100%] rounded-2xl h-[255px] bg-cover bg-no-repeat mt-5 md:h-[400px] md:mt-10 lg:h-[415px] lg:mt-0 lg-w-[857px] lg:mr-7"
          style={{
            backgroundImage: 'url(/image/price.png)',
            backgroundPosition: 'center',
          }}
        />
      </div>
    </section>
  );
}
