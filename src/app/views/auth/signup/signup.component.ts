import {Component, inject} from '@angular/core'
import {Router, RouterLink} from '@angular/router'
import { LogoBoxComponent } from '@component/logo-box.component'
import {FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {getError} from "../../../store/authentication/authentication.selector";
import {AuthenticationService} from "../../../core/services/auth.service";
import {City, Departement} from "../../../core/models/departement.model";
import {ApiService} from "../../../core/services/api.service";
import {SelectFormInputDirective, SelectOptions} from "../../../core/directive/select-form-input.directive";
import {CommonModule} from "@angular/common";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {UserModels} from "../../../core/models/user.models";
import Choices from "choices.js";
import {SelectFormInputApiDirective} from "../../../core/directive/select-form-input-api.directive";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, LogoBoxComponent,
    SelectFormInputDirective,SelectFormInputApiDirective,
    ReactiveFormsModule,
    FormsModule,
    CommonModule],
  templateUrl: './signup.component.html',
  styles: ``,
})
export class SignupComponent {
  signinForm!: UntypedFormGroup
  submitted: boolean = false
  cities: City[] = [];
  departements: Departement[] = [];
  selectOptions: SelectOptions = {
    placeholder: true,
    removeItemButton: false,
    searchEnabled: true,
    shouldSort: false,
  };
  ngAfterViewInit() {
/*    setTimeout(() => {
      new Choices(document.getElementById('departement_id')!, {
        placeholder: true,
        searchEnabled: true,
        removeItemButton: false,
        shouldSort: false,
      });
    });*/
  }
  public fb = inject(UntypedFormBuilder)
  store = inject(Store)
  route = inject(Router)
  service = inject(AuthenticationService)
  apiService = inject(ApiService)
  toastService=inject(ToastrService)
  errorMessage$ = this.store.select(getError);


  constructor() {
    this.signinForm = this.fb.group({
      name: ['', [Validators.required]],
      departement_id: ['', [Validators.required]],
      city_id: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      password_confirmation:[]
    })
  }
  ngOnInit() {
    this.loadDepartements();
  }

  loadDepartements() {
    this.apiService.getDepartements().subscribe(data => {
      this.departements = data;
    });
  }
  loadcity() {
    this.apiService.getCityByDepartementID(this.signinForm.value.departement_id).subscribe(data => {
      this.cities = data;
    });
  }
  get form() {
    return this.signinForm.controls
  }

  onRegister() {
    this.submitted = true
    if (this.signinForm.valid) {

      const formValue = this.signinForm.value;
      this.apiService.addUser(formValue).subscribe({
        next: (cat:UserModels) => {
          this.toastService.success('Compte ajoutée');
          this.route.navigateByUrl('auth/sign-in');
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this.toastService.error('Erreur lors de l\'ajout '+err.error.message);
        }
      });
    }
  }
}
