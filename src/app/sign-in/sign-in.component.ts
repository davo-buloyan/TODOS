import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms'
import { Store } from '@ngrx/store';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import { IAppState, selectAuthError } from '@app/store';
import { signIn } from '@app/store/auth';
import { UserModel } from '@app/models';
import { MatButtonModule } from '@angular/material/button';

type FormValue = Pick<UserModel, 'username' | 'password'>;

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatCardModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    RouterModule,
    MatButtonModule
  ],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  form!: FormGroup;

  authError$ = this.store.select(selectAuthError);

  constructor(private store: Store<IAppState>) {
    this.createForm();
  }

  ngOnInit(): void {}

  createForm() {
    this.form = new FormGroup({
      'username': new FormControl(null),
      'password': new FormControl(null)
    })
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    
    const user = this.form.value as FormValue;

    this.store.dispatch(
      signIn({ user })
    );
  }

}
