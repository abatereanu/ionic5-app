import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchAuctionsRoutingModule } from './search-auctions-routing.module';
import { IonicModule } from '@ionic/angular';
import { FilterCarsAndModelsComponent } from './components/filter-cars-and-models/filter-cars-and-models.component';
import { SearchAuctionsPage } from './page/search-auctions.page';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { NgxsModule } from '@ngxs/store';
import { SearchAuctionsState } from './store/search-auctions.state';
import {MAT_CHIPS_DEFAULT_OPTIONS, MatChipsModule} from '@angular/material/chips';

@NgModule({
  declarations: [
    SearchAuctionsPage,
    FilterCarsAndModelsComponent,
  ],
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    SearchAuctionsRoutingModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatFormFieldModule,
    NgxsModule.forFeature([SearchAuctionsState]),
  ],
  /*providers: [{
    provide: MAT_CHIPS_DEFAULT_OPTIONS,
    useValue: {
      separatorKeyCodes: [ENTER, COMMA]
    }
  }
  ]*/
})
export class SearchAuctionsModule { }
