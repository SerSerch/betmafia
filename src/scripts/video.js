import YT from 'youtube-player';

const autoPlayVideo = element => {
  const player = YT( element, {
    videoId: element.dataset.videoId,
    playerVars: {
      controls: 0,
      frameborder: 1,
      allowfullscreen: true
    }
  });
  if ( element.dataset.repeat ) {
    player.on( 'stateChange', e => e.data === 0 && player.seekTo( 0 ));
  }
  player.mute();
  player.playVideo();

};

export { autoPlayVideo }
