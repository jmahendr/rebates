import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferDetailComponent } from './offer-detail.component';
import { AppMaterialModule } from "../app-material.modules";
import { RouterTestingModule } from '@angular/router/testing';

import { OfferService } from "../services/offer.service";
import { serverurl } from "../shared/baseurl";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import { Offer } from "../shared/offer";
import { OFFERS } from '../shared/OFFERS';

describe('OfferDetailComponent', () => {
  let component: OfferDetailComponent;
  let fixture: ComponentFixture<OfferDetailComponent>;
    
  let offer =  OFFERS[0];
  let offerServiceStub = {
    findOfferById: function(id: number) : Observable<Offer> {
      return Observable.of(offer)
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppMaterialModule,
        RouterTestingModule.withRoutes([{path: 'offerdetail/:id',  component: OfferDetailComponent}])
      ],
      declarations: [ OfferDetailComponent ],
      providers: [ 
        { provide: OfferService, useValue: offerServiceStub },
        { provide: 'serverurl', useValue: serverurl }
       ]
    })
    .compileComponents();
  }));
  

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferDetailComponent);
    component = fixture.componentInstance;  
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
