import { Injectable } from '@angular/core';

import { Offer } from "../shared/offer";
import { Observable } from "rxjs/Observable";
import { Restangular, RestangularModule } from "ngx-restangular";

@Injectable()
export class OfferService {

  constructor(private restangular: Restangular) { }

  getOffers() : Observable<Offer[]> {
    return this.restangular.all('offer').getList();
  }

  findOffers(query:Object): Observable<Offer[]> {
    return this.restangular.all('offer').getList(query);
  }

  findOfferById(id: number) : Observable<Offer> {
    return this.restangular.one('offer', id).get();
  }

  getQualTypes() {
    return this.restangular.all('lookups').getList()
    .map(lookups => lookups);
  }

  getSeedData() {
    return this.restangular.one('seeddata').get();
  }

  postOffer(data) : Observable<Offer> {
    console.log('data from postOffer');
    console.log(data);
    return this.restangular.all('offer').post(data);
  }
}
