export const convertModelToFormData = (val, formData = new FormData(), namespace = '') => {
  if ((typeof val !== 'undefined') && (val !== null)) {
    if (val instanceof Date) {
      formData.append(namespace, val.toISOString());
    } else if (val instanceof Array) {
      for (let element of val) {
        this.convertModelToFormData(element, formData, namespace + '[]');
      }
    } else if (typeof val === 'object' && !(val instanceof File)) {
      for (let propertyName in val) {
        if (val.hasOwnProperty(propertyName)) {
          this.convertModelToFormData(val[propertyName], formData, namespace ? namespace + '[' + propertyName + ']' : propertyName);
        }
      }
    } else {
      formData.append(namespace, val.toString());
    }
  }
  return formData;
};

export default convertModelToFormData;
