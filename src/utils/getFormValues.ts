function getFormValues(event: Event) {
  event.preventDefault();
  const form = event.target as HTMLFormElement;
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
