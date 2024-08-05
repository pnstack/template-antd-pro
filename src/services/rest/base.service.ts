import request from './request';

export class BaseService<T = any> {
  http = request;
  baseUrl = '';

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl ?? '';
  }
}
