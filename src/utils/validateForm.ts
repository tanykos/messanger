/* eslint-disable no-console */
import validateField from './validateField';

function validateForm(event: Event) {
  event.preventDefault();

  const form = event.target as HTMLFormElement;
  const formValues = new FormData(form);
  let isFormValid = true;

  const arr = Array.from(form.elements).filter((ch) => ch.nodeName === 'INPUT');

  arr.forEach((element: any) => {
    const isValid = validateField(element);
    if (!isValid) {
      isFormValid = false;
    }
  });

  // Confirm new password.
  if (formValues.has('newPassword2')) {
    if (formValues.get('newPassword2') === formValues.get('newPassword')) {
      formValues.delete('newPassword2');
    } else {
      isFormValid = false;
      // eslint-disable-next-line no-alert
      alert('Новый пароль не совпадает!');
    }
  }

  // Output input's values to the console.
  const res = {} as any;

  formValues.forEach((value, key) => {
    if (value) { res[key] = value; }
  });

  if (Object.keys(res).length === 0) {
    console.log('All inputs are empty.');
    return false;
  }

  return isFormValid ? res : false;
}

export default validateForm;
