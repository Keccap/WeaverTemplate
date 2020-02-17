export default function scalePx(value) {
  const baseFontSize = parseFloat(window.getComputedStyle(document.documentElement).getPropertyValue('--root-font-size')) || 100;
  const htmlFontSize = parseFloat(getComputedStyle(document.documentElement)['font-size']);
  return (value / baseFontSize) * htmlFontSize;
}
