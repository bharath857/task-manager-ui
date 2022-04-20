import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { SpinnerLoadingService } from '../spinner-loading.service';

@Injectable({
  providedIn: 'root'
})
export class SpinnerInterceptorService implements HttpInterceptor {

  constructor(private spinner: SpinnerLoadingService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinner.setLoading(true, req.url);
    return next.handle(req).pipe(finalize(() => {
      this.spinner.setLoading(false, req.url)
    }))
  }
}
