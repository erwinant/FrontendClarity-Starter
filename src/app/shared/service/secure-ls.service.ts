import { Injectable } from "@angular/core";
import * as SecureLS from "secure-ls";

@Injectable({
  providedIn: "root"
})
export class SecureLsService {
  constructor() {}

  ls = new SecureLS();

  set(key, value) {
    this.ls.set(key, value);
  }

  get(key) {
    let data: any = false;
    try {
      data = this.ls.get(key);
    } catch (error) {
      console.error(error);
      this.ls.remove(key);
    }
    return data;
  }

  remove(key) {
    this.ls.remove(key);
  }

  removeAll() {
    this.ls.removeAll();
  }
}
