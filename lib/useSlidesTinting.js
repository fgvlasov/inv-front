import { useEffect } from 'react';

export const useSlidesTinting = (swiperRef) => {
  const tintLastElement = () => {
    const width = window.innerWidth;
    const { slides } = swiperRef.current;
    slides.forEach((slide) => slide.children[0].classList.remove('opacity-60'));
    const visibleSlides = slides
      .filter((slide) => slide.getBoundingClientRect().x <= width)
      .sort((a, b) => a.x - b.x);

    const lastVisibleSlide = visibleSlides[visibleSlides.length - 1];
    lastVisibleSlide.children[0].classList.add('opacity-60');
    lastVisibleSlide.children[0].style.borderColor = 'red';
  };

  const handleTransitionEnd = () => {
    //console.log('slider transition end');
    tintLastElement();
  };

  useEffect(() => {
    tintLastElement();

    window.addEventListener('resize', tintLastElement);
    return () => {
      window.removeEventListener('resize', tintLastElement);
    };
  }, []);

  return { onTransitionEnd: handleTransitionEnd };
};
