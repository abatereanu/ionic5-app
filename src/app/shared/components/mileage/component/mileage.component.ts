import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-mileage',
  templateUrl: './mileage.component.html',
  styleUrls: ['./mileage.component.scss'],
})
export class MileageComponent {
  @Input() formGroup: FormGroup;
  @Output() mileageTransform = new EventEmitter();

  onTransformMileage(event: CustomEvent) {
    this.mileageTransform.emit(event);
  }
}
