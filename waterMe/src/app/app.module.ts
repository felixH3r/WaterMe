import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PlantsListingComponent } from './DashboardComponent/plants-listing/plants-listing.component';
import { SidebarComponentComponent } from './DashboardComponent/sidebar-component/sidebar-component.component';



@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    PlantsListingComponent,
    SidebarComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
