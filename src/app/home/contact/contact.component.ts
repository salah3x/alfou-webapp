import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  options: string[] = [];

  constructor() { }

  ngOnInit() {
    this.options.push('Option1');
    this.options.push('Option2');
  }

  onSubmit(f: NgForm) {
    const obj = f.control.value;
    // todo reach out to the server
    console.log(obj);
    f.resetForm();
  }
}
