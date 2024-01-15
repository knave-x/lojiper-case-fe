import { User } from "../context/user.context";
import { getBaseUrl } from "../utils";
import { HttpClient } from "./httpClientInterceptor";

class Service extends HttpClient {
  private static _instance: Service | null = null;

  private constructor() {
    super(getBaseUrl());
  }

  public static getInstance(): Service {
    if (!this._instance) {
      this._instance = new Service();
    }

    return this._instance;
  }

  public me = (): Promise<User> => this.instance.get("auth/me");

  public signUp = (data: any) => this.instance.post("auth/signup", data);

  public signIn = (data: any): Promise<User> =>
    this.instance.post("auth/signin", data);
}

export default Service.getInstance();
