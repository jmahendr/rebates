import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { OfferComponent }  from './offer/offer.component';
import { OfferDetailComponent } from './offer-detail/offer-detail.component';
import { FooterComponent }  from './footer/footer.component';
import { AppMaterialModule } from './app-material.modules';

import { ReactiveFormsModule  } from '@angular/forms';

import { RouterTestingModule } from '@angular/router/testing';
import { routes } from './app-routing/routes';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppMaterialModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes(routes)
      ],
      declarations: [
        AppComponent,
        HeaderComponent,
        HomeComponent,
        OfferComponent,
        OfferDetailComponent,
        FooterComponent
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
  
  /*
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
  }));
  */
});
