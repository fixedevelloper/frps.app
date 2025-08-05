import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import {catchError, map} from 'rxjs/operators'

import { CookieService } from 'ngx-cookie-service'
import {environment} from "../../../environments/environment";
import {User} from "../../store/authentication/auth.model";
import {throwError} from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  user: User | null = null

  public readonly authSessionKey = '_frps_AUTH_SESSION_KEY_'
  private apiUrl = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {}

  login(phone: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/api/login`, { phone, password }).pipe(
      map((result) => {
        console.log('Dispatching login with:', result.data.token);
        if (result.data && result.data.token) {
          this.user = result.data;
          this.saveSession(result.data.token);
        }
        return result.data;
      }),
      catchError((error) => {
        console.error('Erreur API login :', error);

        // Extraire un message plus propre si besoin
        const message =
          error?.message || 'Une erreur inconnue est survenue';

        // Propager l’erreur sous forme d’objet
        return throwError(() => message);
      })
    );
  }


  logout(): void {
    this.removeSession()
    this.user = null
  }

  get session(): string {
    return this.cookieService.get(this.authSessionKey)
  }

  saveSession(token: string): void {
    this.cookieService.set(this.authSessionKey, token)
  }

  removeSession(): void {
    this.cookieService.delete(this.authSessionKey)
  }
}
