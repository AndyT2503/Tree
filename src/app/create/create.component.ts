import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  xml: string;
  @Output() SentXML = new EventEmitter<string>();
  @Output() EditConfirm = new EventEmitter<string>();

  selectedValue: string;
  isEdit: boolean;
  @Input() isSelect: string;
  constructor() { }

  ngOnInit(): void {
    this.isEdit = false;
  }

  Mapping(): void {
    this.SentXML.emit(this.xml);
    this.isEdit = true;
    this.EditConfirm.emit('true');
  }

}
