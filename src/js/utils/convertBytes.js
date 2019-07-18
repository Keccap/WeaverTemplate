/**
 * Конвертирование размера файла
 *
 * @param value
 * @param isShowName
 * @param lang
 * @returns {*}
 */
export const convertBytes = (value, isShowName = true, lang = 'en') => {
  const dimensions = {
    en: ['B', 'KB', 'MB', 'GB', 'TB', 'PB'],
    ru: ['Б', 'КБ', 'МБ', 'ГБ', 'ТБ', 'ПБ'],
  };

  if (!(lang in dimensions)) {
    console.error(`Value lang: ${lang} does not exist`);
    return false;
  }
  if (!value) {
    return false;
  }

  let i = 0;
  value = parseInt(value, 10);

  while ((value / 1000 | 0) && i < dimensions[lang].length - 1) {
    value /= 1024;
    i++;
  }
  value = Math.round(parseFloat(value) * 100) / 100;

  if (isShowName === true) {
    value += ` ${dimensions[lang][i]}`;
  }

  return value;
};

export default convertBytes;
