import React from 'react';

const Banner = ({imagePath, heading,subHeading}) => {
    return (
        <div className="hero min-h-screen" style={{backgroundImage:`url(${imagePath})`}}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">{heading}</h1>
                    <p className="mb-5">{subHeading}</p>
                </div>
            </div>
        </div>
    );
};

export default Banner;