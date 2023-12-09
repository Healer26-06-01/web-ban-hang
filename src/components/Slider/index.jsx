import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import React from 'react';

export const Slider = ({ children, slidesPerView = 1, spaceBetween = 0 }) => {
    return (
        <Swiper
            spaceBetween={spaceBetween}
            pagination={{ clickable: true }}
            slidesPerView={slidesPerView}
            onSlideChange={() => console.log('slide change')}
            modules={[Pagination]}
        >
            {React.Children.map(children, (child) => <SwiperSlide>{child}</SwiperSlide>)}
        </Swiper>
    )
}
