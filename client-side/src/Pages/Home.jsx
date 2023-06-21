import React from 'react';
import HomepageBanner from '../Components/HomepageBanner';
import { Helmet } from 'react-helmet-async';
import PopularInstructors from '../Components/PopularInstructors';
import PopularClasses from './PopularClasses';
import YoutubeVideo from '../Components/YoutubeVideo';
const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Camp Rock | Home</title>
            </Helmet>
            <HomepageBanner></HomepageBanner>
            <PopularInstructors></PopularInstructors>
            <PopularClasses></PopularClasses>
            <YoutubeVideo></YoutubeVideo>
        </div>
    );
};

export default Home;