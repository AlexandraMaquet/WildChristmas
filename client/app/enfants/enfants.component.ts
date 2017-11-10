import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { AgmCoreModule } from '@agm/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { EnfantService } from '../services/enfant.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { PereNoelComponent } from '../pere-noel/pere-noel.component';


@Component({
  selector: 'app-enfants',
  templateUrl: './enfants.component.html',
  styleUrls: ['./enfants.component.scss']
})
export class EnfantsComponent implements OnInit {

  enfant = {};
  enfants = [];
  isLoading = true;
  isEditing = false;
  orderDone = false;
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  addEnfantForm: FormGroup;
  name = new FormControl('', Validators.required);
  age = new FormControl('', Validators.required);
  town = new FormControl('', Validators.required);
  present = new FormControl('', Validators.required);

  constructor(private enfantService: EnfantService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone) { }

  ngOnInit() {

    //set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

      //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });

    this.getEnfants();
    this.addEnfantForm = this.formBuilder.group({
      name: this.name,
      age: this.age,
      town: this.town,
      present: this.present
    });
  }

  getEnfants() {
    this.enfantService.getEnfants().subscribe(
      data => this.enfants = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }


  
  addEnfant() {
    this.enfantService.addEnfant(this.addEnfantForm.value).subscribe(
      res => {
        const newEnfant = res.json();
        this.enfants.push(newEnfant);
        this.addEnfantForm.reset();
        this.orderDone = true;
        this.toast.setMessage('Bravo, ton souhait de noël a bien été pris en compte! Encore un peu de patience!', 'success');
      },
      error => console.log(error)
    );
  }

 
  enableEditing(enfant) {
    this.isEditing = true;
    this.enfant = enfant;
  }

  cancelEditing() {
    this.isEditing = false;
    this.enfant = {};
    this.toast.setMessage('enfant editing cancelled.', 'warning');
    // reload the enfants to reset the editing
    this.getEnfants();
  }

  editEnfant(enfant) {
    this.enfantService.editEnfant(enfant).subscribe(
      res => {
        this.isEditing = false;
        this.enfant = enfant;
        this.toast.setMessage('enfant edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteEnfant(enfant) {
    if (window.confirm('Are you sure you want to permanently delete this enfant?')) {
      this.enfantService.deleteEnfant(enfant).subscribe(
        res => {
          const pos = this.enfants.map(elem => elem._id).indexOf(enfant._id);
          this.enfants.splice(pos, 1);
          this.toast.setMessage('name deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

private setCurrentPosition() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.zoom = 12;
    });
  }
}
}
