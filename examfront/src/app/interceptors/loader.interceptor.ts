import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private loader: NgxUiLoaderService){}

  intercept(req: HttpRequest<any>, next: HttpHandler){

    this.loader.start();

    return next.handle(req).pipe(
      finalize(()=>{
        this.loader.stop();
      })
    );

  }
}