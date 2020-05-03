import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

export class HttpErrorInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                retry(1),
                catchError((error: any) => {
                    let errorMessage = '';
                    console.log(error);
                    if (error.error instanceof ErrorEvent) {
                        // client-side error                       
                        errorMessage = `Error: ${error.error.message}`;
                    } else {
                        // server-side error
                        errorMessage = `Codigo de error: <strong style="color:red">${error.status}</strong> <br><br> <strong>${error.error.message}</strong>`;
                    }
                    Swal.fire('Error', errorMessage, 'error');
                    return throwError(errorMessage);
                })
            );
    }
}
