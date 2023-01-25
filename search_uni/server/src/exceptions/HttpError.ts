import Exception from './exception';
import statusCodes from './statusCodes';

export class HttpError {
  static notFound(message: string) {
    return new Exception(statusCodes.NotFound, message);
  };

  static internalServerError(message: string) {
    return new Exception(statusCodes.InternalServerError, message);
  };

  static badRequest(message: string) {
    return new Exception(statusCodes.BadRequest, message);
  };

  static UnauthorizedError(message:string){
    return new Exception(statusCodes.UnauthorizedError, message);
  };
}
// export const HttpErr = new HttpError();
