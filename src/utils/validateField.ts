function validateField(target: Element, inputName: string) {
  const input = target as HTMLFormElement;
  const spanError = document.getElementById(inputName);

  if (!spanError) {
    return;
  }

  if (input.nodeName === 'BUTTON') {
    return;
  }

  let regexp: RegExp;
  switch (inputName) {
    case 'login':
      regexp = /(?!^\d+$)^[A-Za-z0-9-_]{3,20}$/;
      break;
    case 'password':
    case 'password2':
      regexp = /^(?=.*?([A-Z]))(?=.*?\d)(\w|-|_){8,40}$/;
      break;
    case 'first_name':
    case 'second_name':
      regexp = /^[A-Z|А-Я]+?[A-Z|a-z|А-Я|а-я|-]*$/;
      break;
    case 'email':
      regexp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      break;
    case 'phone':
      regexp = /^\+?\d{10,15}$/;
      break;
    case 'message':
      regexp = /^.+$/;
      break;
    default:
      regexp = /[\s\S]+/;
      break;
  }

  if (regexp.test(input.value)) {
    input.classList.add('valid');
    input.classList.remove('invalid');
    spanError!.classList.remove('active');
  } else {
    input.classList.add('invalid');
    input.classList.remove('valid');
    spanError!.classList.add('active');
  }
}

export default validateField;
