import React, { useContext } from 'react';
import myContext from '../context/myContext';

function YoutubeVideo() {
  const { youtubetLink } = useContext(myContext);

  const updateLink = (oldLink) => oldLink.replace('watch', 'embed').replace(/\?v=/g, '/');

  return (
    <div>
      <iframe
        data-testid="video"
        width="560"
        height="315"
        src={ updateLink(youtubetLink) }
        title="YouTube video player"
        allow="accelerometer"
        allowFullScreen
        className="meals-details-video"
      />
    </div>
  );
}

export default YoutubeVideo;
