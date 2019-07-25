import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() cardTitle;
  @Input() cardBody;
  @Input() cardId;
  @Input() cardUser;

  @Output() getIdForRemove = new EventEmitter();
  @Output() getIdForEdit = new EventEmitter();
  test = {
    isClicked: false
  };
  constructor() { }

  ngOnInit() {
  }

  deletePost(id): void {
    this.getIdForRemove.emit(id);
  }

  editPost(id): void {
    this.getIdForEdit.emit(id);
  }

}
