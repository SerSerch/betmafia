import YT from 'youtube-player';
import browser from 'bowser';

const autoPlayYoutubeVideo = element => {
  element.classList.add( 'youtube-video_ready' );
  const player = YT( element, {
    videoId: element.dataset.videoId,
    playerVars: {
      wmode: 'opaque',
      iv_load_policy: 3,
      rel: 0,
      branding: 0,
      showinfo: 0,
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

export { autoPlayYoutubeVideo };
