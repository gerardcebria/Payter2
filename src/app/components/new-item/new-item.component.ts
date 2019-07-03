import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subject, BehaviorSubject } from 'rxjs';

import { DataItem } from 'app/model';
import { DataService } from 'app/services/data';

@Component({
  templateUrl: './new-item.component.html'
})
export class NewItemComponent {

  form: FormGroup;

  $error: Subject<string> = new BehaviorSubject<string>(null);

  constructor(
      private formBuilder: FormBuilder,
      private dataService: DataService,
      private router: Router,
  ) {}

  ngOnInit() {
    this.form = this.initForm();
  }

  private initForm(): FormGroup {
    return this.formBuilder.group({
      name: this.formBuilder.control(null, Validators.required),
      description: this.formBuilder.control(null),
      referenceCode: this.formBuilder.control(null)
    });
  }

  markInvalid(field: string) {
    const control = this.form.get(field);
    return control && control.invalid && control.touched;
  }

  submit() {
    this.$error.next(null);

    const value = this.form.value;

    const newItem: DataItem = {
      name: value.name,
      description: value.description,
      createdDate: new Date(),
      referenceCode: value.referenceCode
    }

    console.log(value);

    this.dataService.createItem(newItem).subscribe((item) => {
      this.router.navigate(['/items','details', item.id]);
    }, err => {
      this.$error.next(err.message);
    });
  }
}
