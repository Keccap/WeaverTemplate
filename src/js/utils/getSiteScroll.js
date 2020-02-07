export default function getSiteScroll() {
  return {
    top: window.pageYOffset,
    bottom: window.pageYOffset + document.documentElement.clientHeight,
  };
}
