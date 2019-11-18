import { Injectable, Inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {

  baseUrl; // = environment.baseUrl;
  baseUrlKey = 'icre.api.baseUrl';
  portKey = 'icre.api.port';

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const api: boolean = request.headers.get('X-no-api') === 'true';
    const ip = localStorage.getItem(this.baseUrlKey) || 'localhost';
    const port = localStorage.getItem(this.portKey) || 3000;
    this.baseUrl = `http://${ip}:${port}`;
    // this.baseUrl = 'https://us-central1-icre-eb604.cloudfunctions.net/app';

    if (!api) {
      const apiReq = request.clone({ url: `${this.baseUrl}/${request.url}` });
      return next.handle(apiReq);
    } else {
      return next.handle(request);
    }

  }
}
