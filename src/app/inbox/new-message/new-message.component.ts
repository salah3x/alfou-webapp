import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.css']
})
export class NewMessageComponent implements OnInit {
  loading = false;

  constructor() { }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    this.loading = true;
    const obj = f.value;
    console.log(obj);
    // todo reach out to server
    setTimeout(() => this.loading = false, 2000);
  }
}
