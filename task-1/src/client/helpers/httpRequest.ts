type HttpMethod = 'POST' | 'GET' | 'PUT' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'PATCH' | 'CONNECT' | 'TRACE';

export const httpRequest = async ({ url, method, body, params, headers } : {
  url: string,
  method: HttpMethod,
  body?: object,
  params?: Record<string, string> | string | URLSearchParams,
  headers?: object,
}) : Promise<object> => {
  const httpHeaders = {
    ...headers,
    'Content-Type': 'application/json'
  };

  if (params) {
    if (typeof params === 'object') {
      if (params instanceof URLSearchParams) {
        params = params.toString();
      } else {
        params = (new URLSearchParams(params)).toString();
      }
    }

    url += params;
  }

  const res = await fetch(url, {
    body: body && JSON.stringify(body),
    method,
    headers: httpHeaders,
  });

  return res.json();
};
