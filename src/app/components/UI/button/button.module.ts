import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonComponent} from './button.component';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ButtonComponent,
    ButtonComponent
  ],
  declarations: [ButtonComponent]
})
export class ButtonModule {
}
