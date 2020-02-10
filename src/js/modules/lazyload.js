import 'core-js/features/object/assign';
import 'intersection-observer'; // polyfill
import lozad from 'lozad';
import 'core-js/features/string/starts-with';

export default {
  init() {
    const options = {
      rootMargin: `${ document.documentElement.clientHeight }px 0px`,
    };

    const pictureObserver = lozad('.js-lazy-picture', options);
    const backgroundObserver = lozad('.js-lazy-bg', options);

    pictureObserver.observe();
    backgroundObserver.observe();

    this.lazyVideo();
  },

  lazyVideo() {
    const lazyVideos = [...document.querySelectorAll('video.js-lazy-video')];
    const observerOptions = {
      rootMargin: `${ document.documentElement.clientHeight }px 0px`,
    };

    if ('IntersectionObserver' in window) {
      const lazyVideoObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((video) => {
          if (video.isIntersecting) {
            // eslint-disable-next-line no-restricted-syntax
            for (const source in video.target.children) {
              // eslint-disable-next-line prefer-destructuring
              const videoSource = video.target.children[source];
              if (typeof videoSource.tagName === 'string' && videoSource.tagName === 'SOURCE') {
                // eslint-disable-next-line prefer-destructuring
                videoSource.src = videoSource.dataset.src;
              }
            }

            video.target.load();
            video.target.classList.add('lazyloaded');
            lazyVideoObserver.unobserve(video.target);
          }
        });
      }, observerOptions);

      lazyVideos.forEach((lazyVideo) => {
        lazyVideoObserver.observe(lazyVideo);
      });
    }
  },
};
