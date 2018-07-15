import { Routes } from '@angular/router';

import { OfferComponent } from '../offer/offer.component';
import { HomeComponent } from "../home/home.component";
import { OfferDetailComponent } from "../offer-detail/offer-detail.component";

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'offer', component: OfferComponent},
    {path: 'offerdetail/:id', component: OfferDetailComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: '**', redirectTo: '/home', pathMatch: 'full'}
];