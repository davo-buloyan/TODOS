import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from '@angular/material/button';

import { Store } from '@ngrx/store';

import { UserModel } from '@app/models';
import { signUp } from '@app/store/auth';
import { IAppState, selectAuthError } from '@app/store'

type FormValue = Omit<UserModel, 'id'>;

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  form!: FormGroup;

  authError$ = this.store.select(selectAuthError);

  constructor(
    private store: Store<IAppState>
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

  createForm(): void {
    this.form = new FormGroup({
      'username': new FormControl(null,[Validators.required]),
      'email': new FormControl(null,[Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(4)]),
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.value as FormValue;

    this.store.dispatch(
      signUp({ user: formValue })
    );
  }

}
