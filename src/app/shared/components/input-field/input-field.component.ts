import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss']
})
export class InputFieldComponent implements OnInit {
  @Output() forSearch = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  inputSearch(value: string): void {
    this.forSearch.emit(value);
  }

}
