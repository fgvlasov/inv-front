import {getStrapiMedia} from "lib/media";
import Image from 'next/image';
import Title from '@/components/ui/Title';
import ProjectItem from '@/components/ui/ProjectItem';
import Tag from '@/components/ui/Tag';
import Marquee from '@/components/ui/Marquee';
import ProjectItemImage from '@/components/ui/ProjectItemImage';
import NavItemAccordion from '@/components/ui/NavItemAccordion';
import ProjectButton from '@/components/ui/ProjectButton';

export default function Projects({projects = {}, moreProjects=false}) {
	console.log(projects);
  return (
    <section className='bg-whisper rounded-5xl pb-6 pt-16 md:pt-[60px] text-blackRussian md:pb-12 lg:pt-36 lg:pb-9 lg:rounded-7xl'>
      <div className='container'>
        <div className='px-3.8 lg:px-24.5 lg:pb-20'>
          <div className='flex flex-wrap justify-between lg:items-center lg:flex-nowrap lg:gap-20 lg:pb-[26px]'>
            <Title text="/ Проекты" variant='black'></Title>
            <p className='order-last tracking-tight pb-[27px] pt-10  text-black w-full md:pr-[50%] md:pb-[16px] lg:order-none lg:m-0 lg:p-0 lg:text-xl lg:w-[30%] lg:ml-auto'>
              Мы&nbsp;работаем с&nbsp;ведущими
              компаниями и&nbsp;брендами из&nbsp;различных отраслей.
              При создании могут решаться уникальные задачи, но&nbsp;это всегда проекты с&nbsp;характером
            </p>
            <Title text="® /. 22" variant='black'></Title>
          </div>


          <ul className='pt-15 border-t border-black-russian md:pt-10 lg:grid grid-cols-2 gap-x-7 lg:pt-12'>
          
				{projects[0] && projects.map((project, i) => (
					<li key={i}>{project.id} - {project.attributes.Title}</li>			 
				))}
					
            <ProjectItem name='Екатерининская улица Мурино' asp='aspect-[398/302]' aspTab='aspect-[805/483]' aspDesktop='aspect-[858/483]'>
              <Tag text1='3D анимация' text2='МОДЕЛИРОВАНИЕ' />
              <ProjectItemImage link='/image/content/murino-14.png' width='398' height='302' variant='imageBlock' />
            </ProjectItem>


            <ProjectItem name='Жилой комплекс «ТАЙМ»' asp='aspect-[398/557]' aspTab='aspect-[804/858]' aspDesktop='aspect-[858/483]'>
              <Tag text1='3D анимация' text2='МОДЕЛИРОВАНИЕ' />
              <ProjectItemImage link='/image/content/time.png' width='398' height='557' variant='imageBlock' />
            </ProjectItem>

            <ProjectItem name='3D презентация ЖК «АВИАТОР»' color='bg-cornflower-blue' asp='aspect-[398/300]'>
              <Tag text1='3D анимация' text2='' />
              <ProjectItemImage link='/image/content/logo1.png' width='154' height='120' variant='centerImage' />
            </ProjectItem>

            <ProjectItem name='Агрохолдинг «ЮБИЛЕЙНЫЙ»' asp='aspect-[398/550]'>
              <Tag text1='3D анимация' text2='' />
              <ProjectItemImage link='/image/content/anniversary.png' width='610' height='440' variant='imageBlock' />
            </ProjectItem>

            <ProjectItem name='Конвейер ПТЗ' color='bg-gulf-blue' asp='aspect-[398/300]'>
              <Tag text1='3D анимация' text2='' />
              <ProjectItemImage link='/image/content/ptz.png' width='635' height='527' variant='centerImage' />
            </ProjectItem>

            <ProjectItem name='Рекламный ролик «MEATBROTHERS»' color='bg-baker-chocolate' asp='aspect-[398/487]'>
              <Tag text1='3D анимация' text2='' />
              <ProjectItemImage link='/image/content/meatbrothers.png' width='308' height='308' variant='centerImage' />
            </ProjectItem>


          </ul>

          {moreProjects&&(
            <div className='text-center pb-9 md:flex md:flex-col md:items-center md:pt-5
			  lg:pt-20'>
              <p className='font-interTight font-semibold text-6xl text-black opacity-5
				lg:text-6.5xl'>More</p>
              <ProjectButton/>
            </div>
          )}
        </div>
      </div>
      <Marquee item1='Визуализация^' item2='Motion*' item3='3D моделирование' />
    </section>
  )
}



