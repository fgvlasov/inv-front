import WorkPlanSlider from './WorkPlanSlider.js';


export default function ServicesWorkPlan({data}) {
  
  const workPlanItems = [
    {
      title: data.Workplan_title_1,
      description: data.Workplan_text_1,
      image: null,
    },
    {
      title: data.Workplan_title_2,
      description: data.Workplan_text_2,
      image: null,
    },
    {
      title: data.Workplan_title_3,
      description: data.Workplan_text_3,
      image: null,
    },
    {
      title: data.Workplan_title_4,
      description: data.Workplan_text_4,
      image: null,
    },
    {
      title: data.Workplan_title_5,
      description: data.Workplan_text_5,
      image: null,
    }
  ];
  return (
    <section className='mt-10 container'>
      <h1 className='font-arial font-normal text-3.5xl md:text-4xl leading-10 w-full md:w-[560px] mb-8'>
        {data.Title}
      </h1>
      {workPlanItems && <WorkPlanSlider items={workPlanItems} />}
    </section>
  );
}
