import {Types} from '../modules/actions';

export default function apiMiddleware() {
  return ({ dispatch }) => next => (action) => {
    const { request, type, ...rest } = action;
    if (type === Types.API_CALL) {
      const apiRequest = typeof request === 'function' ? request() : request;
      apiRequest.then((res) => {
        dispatch({
          ...rest,
          payload: res,
          type: Types.API_CALL_SUCCESS,
        });
      }, (error) => {
        dispatch({
          ...rest,
          error: error.message || error,
          type: Types.API_CALL_FAILURE,
        });
      });

      return next({
        ...rest,
        type: Types.API_CALL_REQUEST,
      });
    }

    return next(action);
  };
}
