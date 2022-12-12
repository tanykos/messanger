/* eslint-disable no-console */
import validateField from './validateField';

function validateForm(event: Event) {
  event.preventDefault();

  const form = event.target as HTMLFormElement;
  const formValues = new FormData(form);

  Array.from(form.elements).forEach((element: any) => {
    validateField(element, element.name);
  });

  // Output input's values to the console.

  const res = {} as any;

  formValues.forEach((value, key) => {
    if (value) { res[key] = value; }
  });

  if (Object.keys(res).length === 0) {
    console.log('All inputs are empty.');
  } else {
    console.log(res);
  }
}

export default validateForm;
