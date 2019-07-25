import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from './components/loader/loader.component';
import { CardPipe } from '../pipes/card.pipe';
import { CardComponent } from './components/card/card.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

const COMPONENTS = [
  LoaderComponent,
  CardComponent,
  InputFieldComponent
];

const PIPES = [
  CardPipe
];

const MODULES = [
  CommonModule,
  HttpClientModule,
  InfiniteScrollModule,
  ReactiveFormsModule,
  FormsModule
];

@NgModule({
  declarations: [...COMPONENTS, ...PIPES ],
  exports: [ ...COMPONENTS, ...PIPES, ...MODULES ],
  imports: [
    ...MODULES
  ]
})
export class SharedModule { }
