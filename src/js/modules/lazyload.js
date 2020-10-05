import 'core-js/features/object/assign';
import 'intersection-observer'; // polyfill
import lozad from 'lozad';

export default {
  init(root = document) {
    const options = {
      rootMargin: `${document.documentElement.clientHeight}px 0px`,
    };

    const pictures = root.querySelectorAll('.js-lazy-img:not([data-loaded])');
    const backgrounds = root.querySelectorAll('.js-lazy-bg:not([data-loaded])');

    if (pictures.length) {
      const pictureObserver = lozad(pictures, options);
      pictureObserver.observe();
    }

    if (backgrounds.length) {
      const backgroundObserver = lozad(backgrounds, options);
      backgroundObserver.observe();
    }

    this.lazyVideo(root);
  },

  lazyVideo(root = document) {
    const lazyVideos = [...root.querySelectorAll('video.js-lazy-video:not([data-loaded])')];
    const observerOptions = {
      rootMargin: `${document.documentElement.clientHeight}px 0px`,
    };

    if ('IntersectionObserver' in window) {
      const lazyVideoObserver = new IntersectionObserver((entries) => {
        entries.forEach((video) => {
          if (video.isIntersecting) {
            // eslint-disable-next-line no-restricted-syntax,guard-for-in
            for (const source in video.target.children) {
              // eslint-disable-next-line prefer-destructuring
              const videoSource = video.target.children[source];
              if (typeof videoSource.tagName === 'string' && videoSource.tagName === 'SOURCE') {
                // eslint-disable-next-line prefer-destructuring
                videoSource.src = videoSource.dataset.src;
              }
            }

            video.target.load();
            video.target.setAttribute('data-loaded', 'true');
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
