import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferComponent } from './offer.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from "../app-material.modules";
import { ReactiveFormsModule  } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

//for the service
import { OfferService } from "../services/offer.service";
import { serverurl } from "../shared/baseurl";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import { Offer } from "../shared/offer";
import { OFFERS } from '../shared/OFFERS';

//for inspecting the DOM
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('OfferComponent', () => {
  let component: OfferComponent;
  let fixture: ComponentFixture<OfferComponent>;

  
  let offerServiceStub = {
    getOffers: function(): Observable<Offer[]> {
      return Observable.of(OFFERS);
    },

    getSeedData: function(): any {
      return Observable.of(OFFERS);
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppMaterialModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([{path: 'offer', component: OfferComponent}]),
        BrowserAnimationsModule
        ],
      declarations: [ OfferComponent ],
      providers: [ 
        { provide: OfferService, useValue: offerServiceStub },
        { provide: 'serverurl', useValue: serverurl }
       ]
    })
    .compileComponents();

    let offerService = TestBed.get(OfferService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('offers should be found with 2 entries', () => {
    expect(component.offers.length).toBe(2);
  });

  it('should use the offers in the template', ()=> {
    fixture.detectChanges();

    let de: DebugElement;
    let el: HTMLElement;

    de = fixture.debugElement.query(By.css("#tableIdOffer"));
    el = de.nativeElement;

    expect(el.textContent).toContain(OFFERS[0].name);
  });

});
