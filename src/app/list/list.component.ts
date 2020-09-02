import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {


  initLoading = true; // bug
  loadingMore = false;
  data: any[] = [];
  list = ['Sku-Material', 'Sku-Material', 'Sku-Material'];
  @Output() DataEdit = new EventEmitter<string>();
  @Output() EditConfirm = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  /* getData(callback: (res: any) => void): void {
    this.http.get(fakeDataUrl).subscribe((res: any) => callback(res));
  }

  onLoadMore(): void {
    this.loadingMore = true;
    this.list = this.data.concat([...Array(count)].fill({}).map(() => ({ loading: true, name: {} })));
    this.http.get(fakeDataUrl).subscribe((res: any) => {
      this.data = this.data.concat(res.results);
      this.list = [...this.data];
      this.loadingMore = false;
    });
  } */

  edit(item: any): void {
    this.DataEdit.emit(item);
    this.EditConfirm.emit(true);
  }

  Delete(item): void {

  }
}
