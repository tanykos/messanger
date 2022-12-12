enum Methods {
  get = 'GET',
  post = 'POST',
  put = 'PUT',
  delete = 'DELETE',
}

function queryStringify(data: any) : string {
  const mas = Object.entries(data).map((item) => `${item[0]}+'='+${item[1]}`);
  const queryStr = mas.join('&');
  return `'?' + ${queryStr}`;
}

interface CustomFetchProps {
  method?: Methods;
  timeout?: number;
  headers?: [string, string][];
  data?: Document | XMLHttpRequestBodyInit | null | undefined;
}

export default class CustomFetch {
  get = (url:string, options: CustomFetchProps = {}) => this.request(
    url,
    { ...options, method: Methods.get },
    options.timeout,
  );

  post = (url:string, options: CustomFetchProps = {}) => this.request(
    url,
    { ...options, method: Methods.post },
    options.timeout,
  );

  put = (url:string, options: CustomFetchProps = {}) => this.request(
    url,
    { ...options, method: Methods.put },
    options.timeout,
  );

  delete = (url:string, options: CustomFetchProps = {}) => this.request(
    url,
    { ...options, method: Methods.delete },
    options.timeout,
  );

  request = (url: string, options: CustomFetchProps, timeout = 5000) => {
    const { method, data, headers } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      if (headers && headers?.length) {
        headers.forEach(([name, val]) => {
          xhr.setRequestHeader(name, val);
        });
      }
      xhr.timeout = timeout;

      if (method === Methods.get && data) {
        // for adding queryparams to url
        // eslint-disable-next-line no-param-reassign
        url += queryStringify(data);
      }

      xhr.open(method as string, url);

      xhr.onload = () => {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

      if (method === Methods.get || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
