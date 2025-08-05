import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
  type UntypedFormGroup,
} from '@angular/forms'
import { Router, RouterModule } from '@angular/router'
import { LogoBoxComponent } from '@component/logo-box.component'
import { AuthenticationService } from '@core/services/auth.service'
import { Store } from '@ngrx/store'
import { login } from '@store/authentication/authentication.actions'
import {getError} from "../../../store/authentication/authentication.selector";

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LogoBoxComponent,
  ],
  templateUrl: './signin.component.html',
  styles: ``,
})
export class SigninComponent {
  signinForm!: UntypedFormGroup
  submitted: boolean = false

  public fb = inject(UntypedFormBuilder)
  store = inject(Store)
  route = inject(Router)
  service = inject(AuthenticationService)
  errorMessage$ = this.store.select(getError);


  constructor() {
    this.signinForm = this.fb.group({
      phone: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  get form() {
    return this.signinForm.controls
  }

  onLogin() {
    this.submitted = true
    if (this.signinForm.valid) {
      const phone = this.form['phone'].value // Get the username from the form
      const password = this.form['password'].value // Get the password from the form
      console.log('Dispatching login with:', phone, password);
      // Login Api
      this.store.dispatch(login({ phone: phone, password: password }))
    }
  }
}
