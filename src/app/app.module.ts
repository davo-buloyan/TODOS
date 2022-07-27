import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { authReducer, AuthEffects } from './store/auth';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    StoreModule.forRoot(
      {
        auth: authReducer,
      },
      // {
      //   initialState: {
      //     auth: {
      //       user: localStorage.getItem('usertoken') ?? null,
      //     },
      //     todos: {
      //       searchTerm: '',
      //       paginator: {
      //         pageIndex: 0,
      //         pageSize: 10,
      //         pageSizeOptions: [5, 10, 25],
      //       },
      //       sort: {
      //         direction: 'asc', // 'asc' | 'desc' | '';
      //       },
      //       entities: [
      //         { id: 1, title: 'Todo 1', dateCreated: new Date(), completed: false },
      //         { id: 2, title: 'Todo 2', dateCreated: new Date(), completed: false },
      //         { id: 3, title: 'Todo 3', dateCreated: new Date(), completed: true },
      //         { id: 4, title: 'Todo 4', dateCreated: new Date(), completed: false },
      //         { id: 5, title: 'Todo 5', dateCreated: new Date(), completed: true },
      //       ],
      //     }
      //   }
      // }
    ),
    StoreDevtoolsModule.instrument({
      name: 'Todos App'
    }),
    EffectsModule.forRoot([
      AuthEffects
    ])
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'outline',
        color: 'primary'
      } as MatFormFieldDefaultOptions
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
