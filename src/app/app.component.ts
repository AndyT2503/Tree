import { Component, OnInit } from '@angular/core';






@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isEdit: string;
  isSelect: string;
  isDisable: boolean;
  xmlFile: string;
  ngOnInit(): void {
    this.isEdit = 'false';
    this.isDisable = true;
  }



  UpdateTree(): void {
    this.isSelect = 'true';
    this.isEdit = 'false';
    this.isDisable = true;
  }

  CreateTree(): void {
    this.isDisable = true;
    this.isEdit = 'false';
    this.isSelect = 'false';
  }

  GetXML(xml: string): void {
    this.xmlFile = xml;
  }

  EditConfirm(bool: string): void {
    this.isEdit = bool;
    this.isDisable = false;
  }
}

