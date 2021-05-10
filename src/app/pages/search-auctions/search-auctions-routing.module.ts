import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchAuctionsPage } from './page/search-auctions.page';
import { FilterCarsAndModelsComponent } from './components/filter-cars-and-models/filter-cars-and-models.component';

const routes: Routes = [
  {
    path: '',
    component: SearchAuctionsPage,
    pathMatch: 'full',
  },
  {
    path: 'cars-and-models',
    component: FilterCarsAndModelsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchAuctionsRoutingModule {}
