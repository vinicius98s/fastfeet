export enum Errors {
  USER_NOT_FOUND = 'User not found',
  GENERIC_ERROR = 'Something went wrong',
  MISSING_CREDENTIALS = 'You must provide all your credentials',
  INCORRECT_CREDENTIALS = 'Your password is not correct',
  UNAUTHORIZED_REQUEST = 'You must sign in to complete this request',
  MISSING_TOKEN = 'Your token must be provided',
  INVALID_TOKEN = 'Invalid token provided',
  SERVER_ERROR = 'Internal server error',
}

export enum RecipientErrors {
  REQUIRED_NAME = 'The recipient name must be provided',
  SHORT_NAME = 'The recipient name is too short',
  INVALID_STREET = 'The street is not valid',
  REQUIRED_STREET = 'The recipient street must be provided',
  REQUIRED_NUMBER = 'The recipient number must be provided',
  INVALID_CITY = 'The city is not valid',
  REQUIRED_CITY = 'The recipient city must be provided',
  INVALID_ZIP_CODE = 'The zip code is not valid',
  REQUIRED_ZIP_CODE = 'The recipient zip code must be provided',
  INVALID_STATE = 'The state is not valid',
  REQUIRED_STATE = 'The recipient state must be provided',
  RECIPIENT_NOT_FOUD = 'The recipient was not found',
}

export enum DeliverymanErrors {
  REQUIRED_NAME = 'Deliveryman name is required',
  REGISTERED = 'Deliveryman already registered',
  NOT_FOUND = 'Deliveryman not found',
}

export enum OrderErrors {
  INVALID_HOUR = 'Invalid hour registered',
  REQUIRED_PRODUCT = 'Product name is required',
  NOT_FOUND = 'Order not found',
}
