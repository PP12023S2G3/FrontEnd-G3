import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    // Obtén el token de autenticación de donde lo tengas (por ejemplo, un servicio de autenticación).
    const token = localStorage.getItem('token'); // Reemplaza con la forma correcta de obtener tu token.

    // Clona la solicitud original y agrega el encabezado de autorización.
    const authReq = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Continúa con la solicitud modificada.
    return next.handle(authReq);
  }
}
