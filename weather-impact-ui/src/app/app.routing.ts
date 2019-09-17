import { Routes, RouterModule } from '@angular/router';
import { StaticLayoutComponent } from './_layouts/static-layout/static-layout.component';
import { NscGlobalViewComponent } from './pages/view/traffic-view.component';

const appRoutes: Routes = [
       // Static Pages routes goes here
    {
        path: '',
        component: StaticLayoutComponent,
        children: [
          { pathMatch: 'full', path: '', component: NscGlobalViewComponent},
        ]
    },
];

export const routing = RouterModule.forRoot(appRoutes);
