import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { EnfantService } from '../services/enfant.service';
import { ToastComponent } from '../shared/toast/toast.component';


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

  addEnfantForm: FormGroup;
  name = new FormControl('', Validators.required);
  age = new FormControl('', Validators.required);
  town = new FormControl('', Validators.required);

  constructor(private enfantService: EnfantService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.getEnfants();
    this.addEnfantForm = this.formBuilder.group({
      name: this.name,
      age: this.age,
      town: this.town
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
        this.toast.setMessage('enfant added successfully.', 'success');
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

}
