import React from 'react';

function YoutubeVideo() {
  return (
    <div className="w-full bg-base-100 py-3">
      <h1 className='text-4xl font-bold text-center py-3 '>Camp Live Performance</h1>
      <div className="w-full">
      <iframe className='w-full min-h-screen' src="https://www.youtube.com/embed/g3AMQCf4lj4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      </div>
    </div>
  );
}

export default YoutubeVideo;
