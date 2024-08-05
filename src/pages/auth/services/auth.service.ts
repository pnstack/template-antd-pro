import { BaseService } from '@/services/rest/base.service';

class AuthService extends BaseService {
  constructor() {
    super('auth');
  }

  async login(data) {
    return await this.http.post('login', data);
  }

  async register(data) {
    return await this.http.post('register', data);
  }

  async logout() {
    return await this.http.post('logout');
  }
}

export const authService = new AuthService();
