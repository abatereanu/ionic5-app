import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SettingsPageRoutingModule } from './settings-routing.module';
import { SettingsPage } from './page/settings.page';
import { MaterialModule } from '../../core/material.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SettingsPageRoutingModule, ReactiveFormsModule, MaterialModule],
  declarations: [SettingsPage],
})
export class SettingsPageModule {}
