const HTTPStatus = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  RESOURCE_NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  GONE: 410,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
};

Object.keys(HTTPStatus).forEach(statusCode => {
  console.log('Getting status code: ', statusCode)
  Object.defineProperty(HTTPStatus, statusCode, {
    value: HTTPStatus[statusCode],
    writable: false,
    enumerable: true,
    configurable: false,
  });
});


module.exports = {
  HTTPStatus: HTTPStatus,

  sendResponse: (res, responseData) => {
    if (res && (res.finished || res.writableFinished || res.writableEnded)) return;
    res.status(responseData.code).json(responseData);

  },

  respond: (res, message, code, data = null) => {
    module.exports.sendResponse(
      res,
      module.exports.generateMessage(message, code, data)
    );
  },

  generateSuccessMessage: (message) => ({
    code: HTTPStatus.OK,
    message,
  }),

  generateErrorMessage: (message, code = HTTPStatus.BAD_REQUEST) => ({
    code,
    message,
  }),

  generateMessage: (message, code, data = null) => {
    const resp = { code, message };
    if (data) resp.data = data;
    return resp;
  }
};
