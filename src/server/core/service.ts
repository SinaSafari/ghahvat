export interface Service<T, I = any> {
  handle(args?: I): T;
}
