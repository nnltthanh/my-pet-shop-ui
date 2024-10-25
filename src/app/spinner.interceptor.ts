import {
  HttpContextToken,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { SpinnerService } from './services/spinner.service';

export const LoadingInSide =
  new HttpContextToken<boolean>(() => false);

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  constructor(private spinnerService: SpinnerService,
              // private spinnerInSideService: SpinnerInsideService
            ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.context.get(LoadingInSide)) {
      // this.spinnerInSideService.show();
      return next.handle(request).pipe(
        finalize( () => {
          // this.spinnerInSideService.hide();
        })
      );
    } else {
      this.spinnerService.show();
      return next.handle(request).pipe(
        finalize( () => {
          this.spinnerService.hide();
        })
      );
    }
  }
}
