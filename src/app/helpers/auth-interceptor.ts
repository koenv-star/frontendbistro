
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';

const HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenStorageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    let requestAuth = request;

    let token = this.tokenService.getToken();

    // console.log(token.toString);

    if (token != null) {
      requestAuth = request.clone({
        headers: request.headers.set(HEADER_KEY, token.toString()),
      });
    }

    return next.handle(requestAuth);
  }
}
