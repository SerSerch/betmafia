import YT from 'youtube-player';
import lazyframe from "lazyframe";

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
        frameborder: 0,
        allowfullscreen: true
      }
    });
    if ( element.dataset.repeat ) {
      player.on( 'stateChange', e => e.data === 0 && player.seekTo( 0 ));
    }
    player.mute();
    player.playVideo();
  },
  appendPlayer = element => {
    const { src } = element.dataset;

    element.innerHTML = `<iframe src="${src}" frameborder="0" allowfullscreen></iframe>`;
  },
  lazyLoadYoutubePlayers = () =>
    lazyframe( '.youtube-player', {
      lazyload: true
    }),
  loadYoutubePlayers = () =>
    document.querySelectorAll( '.youtube-player' )
      .forEach( appendPlayer );

export {
  autoPlayYoutubeVideo,
  lazyLoadYoutubePlayers,
  loadYoutubePlayers
};
