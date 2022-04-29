import { HttpError } from "./HttpError";

export class NoteNotFoundError extends HttpError {
  public static msg = 'Note does not exist.';
  public static httpStatus = 404;

  constructor() {
    super(NoteNotFoundError.msg, NoteNotFoundError.httpStatus);
  }
}
