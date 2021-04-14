import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FilterCarsAndModelsComponent } from './filter-cars-and-models.component';

describe('FilterCarsAndModelsComponent', () => {
  let component: FilterCarsAndModelsComponent;
  let fixture: ComponentFixture<FilterCarsAndModelsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterCarsAndModelsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FilterCarsAndModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
