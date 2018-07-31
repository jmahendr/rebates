import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { OfferService } from "../services/offer.service";
import { Offer } from "../shared/offer";
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})

export class OfferComponent implements OnInit {

  constructor(private offerservice: OfferService,
    private fb: FormBuilder,
    public dialog: MatDialog ) {
      this.createSearchForm();
      this.createOfferForm();
    }

  ngOnInit() {
    if(this.mode == 'summary')
      this.queryOffers();
      //this.loadLookups();
      this.loadSeedData();
  }

  mode='summary';
  offers: Offer[];
  offerError: string =  undefined;
  displayedColumns = ['id', 'type', 'name', 'description', 'code', 'startDate', 'endDate'];
  dataSource = new MatTableDataSource<Offer>(this.offers);

  queryParams = {};
  searchForm: FormGroup;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }



  private  queryOffers() {
    console.debug("queryOffers fired....");
    this.offerservice.getOffers()
    .subscribe(data => {
        this.offers = data;
        this.dataSource = new MatTableDataSource<Offer>(this.offers);
        this.dataSource.paginator = this.paginator;},
      errorMsg => { this.offerError = <any>errorMsg; });
  };

  private searchOffers(query: Object) {
    console.debug("searchOffers fired....");
    this.offerservice.findOffers(query)
    .subscribe(data => {
      this.offers = data;
      this.dataSource = new MatTableDataSource<Offer>(this.offers);
      this.dataSource.paginator = this.paginator;},
    errorMsg => { this.offerError = <any>errorMsg; });
  }

  query() {
    console.debug("query fired....");
    this.offers = null;
    this.dataSource = new MatTableDataSource<Offer>();
    this.queryOffers();
  }

  /**
   * Search Form Related Code
   */
  createSearchForm() {
    this.searchForm = this.fb.group({
      name:'',
      code: '',
      startDate: '',
      endDate:''
    });
  }

  onSubmit(){
    this.queryParams = this.searchForm.value;

    let q ={};
    for(var key in this.queryParams)
    {
      // check whether the key exists in the obj
      if (this.queryParams.hasOwnProperty(key))
      {
        // use key and its value
        let newkey = key;

        //only add non null query params to new Query Object.
        if(this.queryParams[key])
          q[newkey] = this.queryParams[key];
      }
    }
    console.debug("The query string is " + JSON.stringify(q));

    this.offers = null;
    this.dataSource = new MatTableDataSource<Offer>();
    this.searchOffers(q);
  }

  /**
   *
   *
   *
   *
   * Section for Offer Create
   *
   *
   *
   */

   offerForm: FormGroup;
   qualType = {};
   offerType = {};
   offerStatus = {};
   offerData = {};
   offerCreateErr = null;
   submitAction = false;

   onCreateBtn() {
     this.mode = 'create';
     this.createOfferForm();
   }

   goBack() {
     this.mode = 'summary';
     this.query();
   }

   step = 0;

   setStep(index: number) {
     this.step = index;
   }

   nextStep() {
     this.step++;
   }

   prevStep() {
     this.step--;
   }

   createOfferForm() {
    this.offerForm = this.fb.group({
      name:'',
      code: '',
      description:'',
      startDate: '',
      endDate:'',
      type:'',
      status:'',
      qualifiers:this.fb.array([this.createQualifiers()]),
      modifiers:[]
    });
  }

  createQualifiers(){
    return this.fb.group({
      type:'',
      valueId: '',
      valueText: ''
    });
  }

  addQualifier() {
    let qualifiers = <FormArray>this.offerForm.get('qualifiers');
    qualifiers.push(this.createQualifiers());
  }
  removeQualifier(i) {
    let qualifiers = <FormArray>this.offerForm.get('qualifiers');
    qualifiers.removeAt(i);
  }

  onOfferFormSubmit() {

    this.submitAction = true;
    console.debug(this.offerData);
    console.log(this.offerForm.value);
    this.offerservice.postOffer(this.offerForm.value)
      .subscribe(offer => {
        this.submitAction = false;
        this.offerData = offer;
        let confirmDialogRef = this.dialog.open(ConfirmDialog, {
          width: '500px',
          data:  this.offerData
        });

        confirmDialogRef.afterClosed().subscribe(result => {
          console.debug('The confirm dialog was closed with ');
          this.offerForm.reset();
          this.query();
          this.mode = 'summary';


        });//end of afterClose

      },
      error => {
        this.offerCreateErr = <any>error;
        this.submitAction = false;
      });
  }

  loadLookups() {
    this.offerservice.getQualTypes()
    .subscribe(data => {
      console.log(data);
      this.qualType = data;
    });
  }

  loadSeedData() {
    this.offerservice.getSeedData()
    .subscribe(data => {
      console.log(data['qualtype']);
      this.qualType = data['qualtype'];
      this.offerType = data['offertype'];
      console.log(this.offerType);
      this.offerStatus = data['offerstatus'];
      console.log(this.offerStatus);
    });
  }

  openDialog(i): void {

    let qualifiers = <FormArray>this.offerForm.get('qualifiers');
    let typeControl = <FormControl>qualifiers.at(i).get('type')

    let dialogRef = this.dialog.open(QualLOV, {
      width: '500px',
      data: { type: typeControl.value, returnId: '', returnText: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.debug('The dialog '+ i + ' was closed with ' + result);

      /* Check for result != undefined - this occurs when the dialog is closed without values (aka cancelled) */
      if(result != undefined) {
        let valueTextControl = <FormControl>qualifiers.at(i).get('valueText');
        let valueIdControl = <FormControl>qualifiers.at(i).get('valueId');
        if(result.returnText != undefined)
          valueTextControl.setValue(result.returnText);
        if(result.returnId != undefined)
          valueIdControl.setValue(result.returnId);

        console.debug('trying to get Text fc ' + valueTextControl.value);
        console.debug('trying to get Id fc ' + valueIdControl.value);
      }
    });//end of afterClose
  }//end of openDialog
}//enf of OfferComponent


/**
 * Dialog for Qualifier LOV
*/
@Component({
  selector: 'qualLOV-dialog',
  templateUrl: 'qualLOV-dialog.html',
})
export class QualLOV {

  constructor(
    public dialogRef: MatDialogRef<QualLOV>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}//end of QualLOV


/**
 * Dialog for Confirmation
*/
@Component({
  selector: 'confirmation-dialog',
  templateUrl: 'confirmation-dialog.html',
})
export class ConfirmDialog {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}//end of ConfirmDialog
