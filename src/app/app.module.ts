import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppMaterialModule } from "./app-material.modules";
import { FlexLayoutModule } from '@angular/flex-layout';
import { RestangularModule, Restangular } from "ngx-restangular";
import { RestangularConfigFactory } from "./shared/restConfig";
import { baseurl, serverurl } from "./shared/baseurl";
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { OfferComponent, QualLOV, ConfirmDialog } from './offer/offer.component';
import { HomeComponent } from './home/home.component';
import { OfferService } from "./services/offer.service";

import { AppRoutingModule } from "./app-routing/app-routing.module";
import { OfferDetailComponent } from './offer-detail/offer-detail.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    OfferComponent,
    HomeComponent,
    QualLOV,
    ConfirmDialog,
    OfferDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    RestangularModule.forRoot(RestangularConfigFactory),
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [QualLOV, ConfirmDialog],
  providers: [
    OfferService,
    {provide : 'BaseURL', useValue: baseurl}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
