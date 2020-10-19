import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {BroadcastServiceService} from './BroadcastService/broadcast-service.service';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttperrorinterceptorService implements HttpInterceptor {
  public errorMessage = '';
  public errorNumber = 0;
   constructor(private router: Router, public broadcastService: BroadcastServiceService) {
   }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          console.log('this is client side error');
          this.broadcastService.errorNumber.next(error.status);
          this.broadcastService.errorMessage.next(error.message);
          this.router.navigateByUrl('error');

        } else {
          console.log('this is server side error');
          this.broadcastService.errorNumber.next(error.status);
          this.broadcastService.errorMessage.next(error.message);
          this.router.navigateByUrl('error');
        }
        console.log(errorMsg);
        return throwError(errorMsg);
      })
    );
  }
}
