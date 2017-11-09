import { Component, OnInit } from '@angular/core';
import { EnfantsComponent } from '../enfants/enfants.component'

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { EnfantService } from '../services/enfant.service';
import { ToastComponent } from '../shared/toast/toast.component';


@Component({
  selector: 'app-elf',
  templateUrl: './elf.component.html',
  styleUrls: ['./elf.component.scss']
})
export class ElfComponent implements OnInit {
    
  enfant = {};
  enfants = [];
  isLoading = true;

  addEnfantForm: FormGroup;
  name = new FormControl('', Validators.required);
  age = new FormControl('', Validators.required);
  town = new FormControl('', Validators.required);
  present = new FormControl('', Validators.required);

  constructor(private enfantService: EnfantService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent) { }

  ngOnInit() {
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
        this.toast.setMessage('Bravo, ton souhait de noël a bien été pris en compte! Encore un peu de patience!', 'success');
      },
      error => console.log(error)
    );
  }

  created(enfant) {
    enfant.created = true;
    this.enfantService.editEnfant(enfant).subscribe(
      res => {
        this.enfant = enfant;
        this.toast.setMessage('le cadeau a été fabriqué!', 'success');
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

