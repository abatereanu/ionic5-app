import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { NgxsModule } from '@ngxs/store';
import { SearchAuctionsState } from './store/search-auctions.state';
import { SearchAuctionsPage } from './page/search-auctions.page';
import { FilterCarsAndModelsComponent } from './components/filter-cars-and-models/filter-cars-and-models.component';
import { SearchAuctionsRoutingModule } from './search-auctions-routing.module';
import { MileageModule } from '../../shared/components/mileage/mileage.module';

@NgModule({
  declarations: [SearchAuctionsPage, FilterCarsAndModelsComponent],
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    SearchAuctionsRoutingModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MileageModule,
    NgxsModule.forFeature([SearchAuctionsState]),
  ],
})
export class SearchAuctionsModule {}
