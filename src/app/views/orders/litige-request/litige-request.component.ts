import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {PageTitleComponent} from "../../../components/page-title.component";
import {FileUploaderComponent} from "../../../components/file-uploader/file-uploader.component";
import {SelectFormInputDirective} from "../../../core/directive/select-form-input.directive";
import {CommonModule} from "@angular/common";
import {ApiService} from "../../../core/services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-return-request',
  standalone: true,
  imports: [
    PageTitleComponent,
    FileUploaderComponent,
    SelectFormInputDirective,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './litige-request.component.html',
  styleUrl: './litige-request.component.scss'
})
export class LitigeRequestComponent {
  imagePreviews: string[] = [];
  returnForm: FormGroup;
  submitted = false;
  order: any = {};
  orderId!: number;
  constructor(private fb: FormBuilder,private orderService: ApiService, private route: ActivatedRoute,private toastService:ToastrService, private router:Router) {
    this.returnForm = this.fb.group({
      type: ['', Validators.required],
      description: ['', Validators.required],
      //files: [null, Validators.required],
      nonConformDetail: [''],
      orderId: ['']
    });
  }
  ngOnInit(): void {
    this.orderId = +this.route.snapshot.paramMap.get('id')!;
    if (this.orderId) {
      this.orderService.getOrderById(this.orderId).subscribe((data) => {
        this.order = data.data;
      });
    }
  }
  files: File[] = [];

  onFileChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.files = Array.from(target.files); // Stockage réel
      this.imagePreviews = []; // Reset des previews
      this.files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreviews.push(reader.result as string);
        };
        reader.readAsDataURL(file);
      });
    }
    console.log(this.imagePreviews);
  }

  onSubmit() {
    this.submitted = true;

    if (this.returnForm.valid) {
      const formData = new FormData();
      formData.append('type', this.returnForm.value.type);
      formData.append('description', this.returnForm.value.description);
      formData.append('order_id', this.orderId.toString());

      this.files.forEach((file) => {
        formData.append('proofs[]', file);
      });

      this.orderService.submitLitige(formData).subscribe((res) => {
        this.toastService.success('Problème signalé avec succès');
        this.router.navigateByUrl('litiges/list');
      });
    }
  }

}
