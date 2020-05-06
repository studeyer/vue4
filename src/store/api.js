'use strict';

import baseApi from "lib/webapi.js";
import { Message } from 'element-ui';

class webapi extends baseApi {
  constructor() {
    super();
  }

  getEnvName() {
    let env = 'prod';
    let url = window.location.hostname;
    if (url.includes('localhost')) {
      env = "me"
    } else if (!isNaN(url.replace(/[\.]/g, ''))) {
      env = "me"
    } else if (url.includes('localhost')) {
      env = 'me';
    } else if (url.includes('vue4.0')) {
      env = 'me';
    } 
    return env;
  }

  prod = `http://${window.location.host}/`;

  ftp = {
    // me: 'http://localhost:8080/',
    me: 'http://47.100.197.169:8088/',
    // me: 'http://118.24.198.193:8080/',
    // inte: 'http://118.24.198.193:8080/',
    prod: this.prod,
  };

  getDomainApi(type) {
    return this.env('ftp')
  }

  setWithCredentials() {
    return true
  }

  setToken() {
    if (this.storage('userinfo')) {
      return { token: this.storage('userinfo').token }
    } else {
      return {}
    }
  }

  //请求体BUG提示
  getMessage(err, type) {
    if (type == 'then') {
      if (err.code && err.code == "4405") {
        Message.error(err.message || this.errorMess);
        window.location.href = "#/"
      } else if (err.code && err.code == "7001") {
        Message.error(err.message || this.errorMess);
        window.location.href = "#/info"
      }
    } else if (type == 'catch') {
      // Message.error(err.msg || this.errorMess);
    }
  }
}

export default new webapi();
