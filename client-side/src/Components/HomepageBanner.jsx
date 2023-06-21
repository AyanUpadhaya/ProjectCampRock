import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./styles/style.css";

// import required modules
import { Navigation } from "swiper";

import banner_one from './../assets/images/banner/banner_one.jpg'
import banner_two from './../assets/images/banner/banner_two.jpg'
import banner_three from './../assets/images/banner/banner_three.jpg'
import banner_four from './../assets/images/banner/banner_four.jpg'
import Banner from "./Banner";
import 'swiper/css/effect-fade'
const HomepageBanner = () => {
    return (
        <div>
            <Swiper
                navigation={true} modules={[Navigation]} className="mySwiper" loop={true} fadeEffect={true}
            >
                <SwiperSlide className="relative">
                    <Banner imagePath={banner_one} heading={'Welcome To Camp Rock'} subHeading={'Perform Live to Enthusiastic Crowds'}></Banner>
                </SwiperSlide>
                <SwiperSlide>
                    <Banner imagePath={banner_two} heading={'Master Your Musical Skills'} subHeading={'Discover Your Voice & Instrumen'}></Banner>
                </SwiperSlide>
                <SwiperSlide>
                    <Banner imagePath={banner_three} heading={'Jam with Passionate Musicians'} subHeading={'Collaborate and Create Magical Music'}></Banner>
                </SwiperSlide>
                <SwiperSlide>
                    <Banner imagePath={banner_four} heading={'Experience the Ultimate Music Camp'} subHeading={'Fun, Friends, and Unforgettable Melodies'}></Banner>
                </SwiperSlide>
                
            </Swiper>

        </div>
    );
};

export default HomepageBanner;