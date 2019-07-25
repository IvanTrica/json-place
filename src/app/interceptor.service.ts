import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { LoaderService } from './services/loader.service';
import { delay, finalize, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  constructor(private injector: Injector, private router: Router, ) { }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const loaderService = this.injector.get(LoaderService);

    loaderService.show();

    return next.handle(req).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          try {
            loaderService.hide();
            this.router.navigate(['err']);
          } catch (e) {
            console.log(e);
          }
        }
        return of(error);
      }
      ),
      delay(2000),
      finalize(() => loaderService.hide())
    );
  }
}
