import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    subject: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
    message: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]),
    aggrement: new FormControl(false, [Validators.requiredTrue]),
  });

  onSubmit() {
    console.log(this.contactForm.value)
  }
}
