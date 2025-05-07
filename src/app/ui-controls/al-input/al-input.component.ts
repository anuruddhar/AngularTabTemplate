import { Component, OnInit, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'al-input',
  templateUrl: './al-input.component.html',
  styleUrls: ['./al-input.component.css']
})
export class AlInputComponent implements OnInit {

  @Input() Placeholder: string = '';
  constructor() { }

  ngOnInit() {
  }

}
