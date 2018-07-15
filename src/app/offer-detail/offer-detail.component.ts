import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Offer } from '../shared/offer';
import { OfferService } from "../services/offer.service";

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.scss']
})
export class OfferDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private offerService: OfferService) { }

  offer: Offer;

  ngOnInit() {
    this.route.params
    .switchMap( (params: Params) => {return this.offerService.findOfferById(+params['id']);})
    .subscribe(
      data => {this.offer = data[0];
        console.debug(this.offer);},
      error => {console.error(error);});
  }

}
