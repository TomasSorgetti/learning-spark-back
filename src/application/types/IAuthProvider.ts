export interface IAuthProvider {
  authenticate(): Promise<any>;
}
