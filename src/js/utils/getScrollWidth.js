export default function getScrollWidth() {
  const element = document.createElement('div');
  Object.assign(element.style, {
    overflowY: 'scroll',
    height: '50px',
    width: '50px',
    visibility: 'hidden',
  });
  document.body.append(element);
  const scrollWidth = element.offsetWidth - element.clientWidth;
  element.remove();

  return scrollWidth;
}
