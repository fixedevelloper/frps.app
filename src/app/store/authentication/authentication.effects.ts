import { Inject, Injectable } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, exhaustMap, map } from 'rxjs/operators'
import {
  login,
  loginFailure,
  loginSuccess,
  logout,
  logoutSuccess,
} from './authentication.actions'
import { AuthenticationService } from '@core/services/auth.service'
import {ToastrService} from "ngx-toastr";
import {LocalContextService} from "../../core/services/local-context.service";

@Injectable()
export class AuthenticationEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      exhaustMap(({ phone, password }) => {
        return this.AuthenticationService.login(phone, password).pipe(
          map((user) => {
            const returnUrl =
              this.route.snapshot.queryParams['returnUrl'] || '/';

              this.localContextService.setToken(user.token);

            this.router.navigateByUrl(returnUrl);
            return loginSuccess({ user });
          }),
          catchError((error) => {
            console.error('Login error:', error); // ✅
            this.toastr.error(error.message, 'Erreur de connexion');
            return of(loginFailure({ error }));
          })
        );
      })
    )
  );


  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      exhaustMap(() => {
        this.AuthenticationService.logout()
        this.router.navigate(['/auth/sign-in'])
        return of(logoutSuccess())
      })
    )
  )

  constructor(
    @Inject(Actions) private actions$: Actions,
    private AuthenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
  private toastr: ToastrService,
    private localContextService:LocalContextService
) {}
}
