import { NgModule } from '@angular/core';

import {UserProfileComponent} from './user-profile/user-profile.component';
import {CommonModule} from '@angular/common';

@NgModule({
    imports: [
        CommonModule

    ],
    declarations: [
        UserProfileComponent,
    ],
    exports: [
        UserProfileComponent,
    ]
})
export class ComponentsModule {}
