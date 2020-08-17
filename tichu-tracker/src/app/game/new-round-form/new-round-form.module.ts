import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewRoundFormComponent } from './new-round-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
  declarations: [NewRoundFormComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatCheckboxModule
  ],
  exports: [NewRoundFormComponent]
})
export class NewRoundFormModule { }
