export interface IGenericResponse extends IThrowError {
  success: boolean;
  msg?: string;
}

export interface IThrowError {
  thrownError?: boolean;
}
