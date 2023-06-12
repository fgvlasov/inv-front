export default function FormButton({ text }) {
  return (
    <div
      className="pt-7 md:flex items-center 
    md:py-3.8  lg:w-1/3 lg:py-0"
    >
      <button
        type="submit"
        className="w-[220px] flex items-center justify-between
      bg-white p-5 text-black-russian rounded-lr uppercase text-left pt-2.5 pb-1.5 md:mr-7
      lg:w-[266px] group hover:text-white border-1 border-inherit hover:bg-nero  hover:border-white/40 transition"
      >
        {text}
        <span className="bg-black-russian w-[37px] h-[37px] flex justify-center items-center rounded-full group-hover:bg-royal-blue ml-10 transition">
          <svg className='w-[9px] h-[15px] viewBox="0 0 9 15" rotate-180'>
            <path
              d="M8.15625 14.1055L1.84046 7.39494L8.15625 0.684416"
              stroke="white"
              strokeWidth="1.5"
              fill="transparent"
            />
          </svg>
        </span>
      </button>
      <p
        className="footnote w-10/12 mt-5 md:mt-0 md:w-2/4
          lg:w-auto lg:text-xs leading-4 lg:items-center cursor-pointer"
      >
        нажимая на кнопку &laquo;Отправить&raquo;, вы&nbsp;соглашаетесь на&nbsp;
        <span className="underline">обработку персональных данных</span>
      </p>
    </div>
  );
}
