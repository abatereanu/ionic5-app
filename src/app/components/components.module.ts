import { NgModule } from '@angular/core';

import {FriendComponentComponent} from './friend-component/friend-component.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {CommonModule} from '@angular/common';

@NgModule({
    imports: [
        CommonModule

    ],
    declarations: [
        UserProfileComponent,
        FriendComponentComponent
    ],
    exports: [
        UserProfileComponent,
        FriendComponentComponent
    ]
})
export class ComponentsModule {}
