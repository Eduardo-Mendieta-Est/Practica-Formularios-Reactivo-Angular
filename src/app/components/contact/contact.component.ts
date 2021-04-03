import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataDbService } from 'src/app/services/data-db.service';

@Component({
  selector: 'contactForm',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  contactForm: FormGroup;

  constructor(private dbData: DataDbService) {
    this.contactForm = this.createFormGroup();
   }

  ngOnInit(): void {
  }

  createFormGroup(){
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(this.emailPattern)]),
      name: new FormControl('',  [Validators.required, Validators.minLength(5)]),
      message: new FormControl('',  [Validators.required, Validators.minLength(10), Validators.maxLength(100)])
    });
  }

  onResetForm(){
    this.contactForm.reset();
  }

  onSaveForm(){
    if(this.contactForm.valid){
      this.dbData.saveMessage(this.contactForm.value);
      this.onResetForm();
      console.log('saved!');
    }else{
      console.log('not valid!');
    }
  }

  /* --------------------- getters --------------------- */
  get name(){return this.contactForm.get('name');}
  get email(){return this.contactForm.get('email');}
  get message(){return this.contactForm.get('message');}
}
