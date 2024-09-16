const requestMiddleWare = config => {
  const headers = {
    'content-type': 'application/json; charset=UTF-8',
    authorization: `Bearer ${window?.localStorage?.getItem('auth-app')}`,
    ...config.headers // Spread existing headers from config
  }

  // Merge the headers into the config
  return { ...config, headers }
}

const responseMiddleWare = response => {
  return response.data
}

const errorHandlerMiddleWare = error => {
  return Promise.reject(error)
}

export { errorHandlerMiddleWare, requestMiddleWare, responseMiddleWare }
