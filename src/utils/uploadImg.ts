export function uploadImg(event: Event) {
  event.preventDefault();

  const inputFile = document.querySelector('.upload-file-input');
  const file = Object(inputFile)!.files[0];

  if (file.size > 5 * 1024 * 1024) {
    // eslint-disable-next-line no-alert
    alert('Файл должен быть не более 5 МБ.');
    // eslint-disable-next-line no-useless-return
    return;
  }

  document.querySelector('.file-name')!.textContent = file.name;
}

export function formDataImg(event: Event) {
  event.preventDefault();
  const inputFile = document.querySelector('.upload-file-input');
  const file = Object(inputFile)!.files[0];
  const formData = new FormData();

  formData.append('avatar', file);

  return formData;
}
