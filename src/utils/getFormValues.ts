function getFormValues(event: Event, formId: string) {
  event.preventDefault();
  const form = document.getElementById(formId) as any;
  const formValues = new FormData(form);

  const res = {} as any;

  formValues.forEach((value, key) => {
    res[key] = value;
  });

  console.log(res);
}

export default getFormValues;
