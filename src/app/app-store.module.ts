import {NgModule} from "@angular/core";

import {Store, StoreModule} from '@ngrx/store';
import {reducer} from './store2/reducers/student.reducer';
import {EffectsModule} from "@ngrx/effects";
import {CourseEffects} from "./store/effects/course.effects";
import {environment} from "../environments/environment";
import {metaReducers, reducers} from "./store/reducers";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {StudentEffects} from "./store/effects/student.effects";
import {TaskEffects} from "./store/effects/task.effects";


@NgModule({
  imports: [
    StoreModule.forRoot({
      student: reducer,
      psychologist: reducer
    }),
    EffectsModule.forRoot([StudentEffects, CourseEffects, TaskEffects]),
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreModule.forFeature('students', reducers),
    StoreModule.forFeature('psychologist', reducers),
  ]
})

export class AppStoreModule { }
