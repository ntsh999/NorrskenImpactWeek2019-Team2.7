import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgHttpLoaderModule } from 'ng-http-loader/ng-http-loader.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { MessageService } from 'primeng/components/common/messageservice';
import { StaticLayoutComponent } from './_layouts/static-layout/static-layout.component';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { MapPopoverComponent } from './common/map/map-popover/map-popover.component';
import { MapService } from './_services/map.service';
import { NscGlobalViewComponent } from './pages/view/traffic-view.component';
import { MapStatsComponent } from './common/map/map-stats/map-stats.component';
import { UtilityService } from './_services/utility.service';
import { AlertService } from './_services/alert.service';
import { StrapiService } from './_services/strapi.service';
import { GrowlModule } from 'primeng/primeng';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        HttpClientModule,
        NgHttpLoaderModule,
        routing,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        NgxEchartsModule,
        FlexLayoutModule,
        GrowlModule,
    ],
    declarations: [
        AppComponent,
        StaticLayoutComponent,
        MapPopoverComponent,
        NscGlobalViewComponent,
        MapStatsComponent
    ],
    entryComponents: [MapPopoverComponent],
    providers: [
        MessageService,
        MapService,
        UtilityService,
        AlertService,
        StrapiService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
  }
