function getFormValues(event: Event, formId: string) {
  event.preventDefault();
  const form = document.getElementById(formId) as any;
  const formValues = new FormData(form);

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

export default getFormValues;
