import { Component, OnInit, DoCheck, OnChanges } from '@angular/core';
import { NzFormatEmitEvent } from 'ng-zorro-antd/tree';



interface Node {
  parent?: string;
  title: string;
  key: string;
  children: Node[];

  isLeaf?: boolean;
  expanded?: boolean;
}

interface Map {
  parent: string;
  title: any;
  key?: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  rootName: string;
  isUpdate: boolean;
  isShowTable: boolean;
  isDrag: boolean;
  TableName: string;
  NodeChange: any;
  listOrigin: Map[] = [];
  listInput: Map[] = [];
  MatchTitle: string;
  NodesOrigin: Node[] = [];
  NodesInput: Node[] = [];
  jsonRaw: any;
  jsonSave: any;

  json = `{"Root":{
    "order": {
      "soldToId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "shipToId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "consigneeId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "supplierId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "whseid": "string",
      "storerKey": "string",
      "orderKey": "string",
      "omsType": "string",
      "externalKey1": "string",
      "externalKey2": "string",
      "priority": 0,
      "gate": "string",
      "door": "string",
      "carrierCode": "string",
      "trailerNumber": "string",
      "driverName": "string",
      "phoneNumber": "string",
      "orderDate": "2020-08-29T04:09:51.827Z",
      "beginTime": "2020-08-29T04:09:51.827Z",
      "endTime": "2020-08-29T04:09:51.827Z",
      "requestShipDate": "2020-08-29T04:09:51.827Z",
      "actualShipDate": "2020-08-29T04:09:51.827Z",
      "deliveryDate": "2020-08-29T04:09:51.827Z",
      "expectedReceiptDate": "2020-08-29T04:09:51.827Z",
      "receiptDate": "2020-08-29T04:09:51.827Z",
      "status": "string",
      "type": "string",
      "wmsSyncDate": "2020-08-29T04:09:51.827Z",
      "wmsSyncStatus": "string",
      "wmsSyncError": "string",
      "tmsSyncDate": "2020-08-29T04:09:51.827Z",
      "tmsSyncStatus": "string",
      "tmsSyncError": "string",
      "userdefine1": "string",
      "userdefine2": "string",
      "userdefine3": "string",
      "userdefine4": "string",
      "userdefine5": "string",
      "userdefine6": "string",
      "userdefine7": "string",
      "userdefine8": "string",
      "userdefine9": "string",
      "userdefine10": "string"
    },
    "orderDetail": {
      "orderId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "skuId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "whseid": "string",
      "storerKey": "string",
      "orderLineNumber": "string",
      "uom": "string",
      "packKey": "string",
      "originalQty": 0,
      "preallocatedQty": 0,
      "allocatedQty": 0,
      "pickedQty": 0,
      "shippedQty": 0,
      "receivedQty": 0,
      "netWeight": 0,
      "grossWeight": 0,
      "cube": 0,
      "status": "string",
      "lottable01": "string",
      "lottable02": "string",
      "lottable03": "string",
      "lottable04": "2020-08-29T04:09:51.827Z",
      "lottable05": "2020-08-29T04:09:51.827Z",
      "lottable06": "string",
      "lottable07": "string",
      "lottable08": "string",
      "lottable09": "string",
      "lottable10": "string",
      "lottable11": "2020-08-29T04:09:51.827Z",
      "lottable12": "2020-08-29T04:09:51.827Z",
      "lpnid": "string",
      "externallinenumber": "string",
      "conditioncode": "string",
      "userdefine1": "string",
      "userdefine2": "string",
      "userdefine3": "string",
      "userdefine4": "string",
      "userdefine5": "string",
      "userdefine6": "string",
      "userdefine7": "string",
      "userdefine8": "string",
      "userdefine9": "string",
      "userdefine10": "string",
      "wmsSyncDate": "2020-08-29T04:09:51.827Z",
      "wmsSyncStatus": "string",
      "wmsSyncError": "string",
      "tmsSyncDate": "2020-08-29T04:09:51.827Z",
      "tmsSyncStatus": "string",
      "tmsSyncError": "string"
    }
  }}`;

  xml = `<?xml version="1.0" encoding="UTF-8"?>
  <ns0:MT_Material xmlns:ns0="urn:OneMG:Outbound">
      <CONTROL>
          <MANDT>916</MANDT>
          <DOCNUM>0000000000006417</DOCNUM>
          <MESTYP>MATMAS</MESTYP>
          <SNDPRN>PSICLNT916</SNDPRN>
          <CRDATE>20200701</CRDATE>
          <CRTIME>154810</CRTIME>
      </CONTROL>
      <ProductItems>
          <ProductItem>
              <MaterialCode>000000000095000092</MaterialCode>
              <MaterialName>Sữa đặc ông thọ đỏ hộp 380g</MaterialName>
              <MaterialType>ZFTR</MaterialType>
              <ProductHierarchy>12030101410</ProductHierarchy>
              <BaseUoM>HOP</BaseUoM>
              <MaterialGroup>1DC001</MaterialGroup>
              <Gross_Weight>0.000</Gross_Weight>
              <Net_Weight>0.000</Net_Weight>
              <Weight_Unit>KGM</Weight_Unit>
              <Volume>0.000</Volume>
              <Length>0.000</Length>
              <Width>0.000</Width>
              <Height>0.000</Height>
              <TotalShelfLife>0</TotalShelfLife>
              <TaxClass>1</TaxClass>
              <DistributionChannel>GT</DistributionChannel>
              <ProductUnit>
                  <UoM>HOP</UoM>
                  <NumeratorConversion>1</NumeratorConversion>
                  <DenominatorConversion>1</DenominatorConversion>
                  <Gross_Weight>0.000</Gross_Weight>
                  <Net_Weight>0.000</Net_Weight>
                  <WeightUnit>KGM</WeightUnit>
                  <Volume>0.000</Volume>
                  <Length>0.000</Length>
                  <Width>0.000</Width>
                  <Height>0.000</Height>
              </ProductUnit>
              <ProductUnit>
                  <UoM>T48</UoM>
                  <NumeratorConversion>48</NumeratorConversion>
                  <DenominatorConversion>1</DenominatorConversion>
                  <Gross_Weight>0.000</Gross_Weight>
                  <Net_Weight>0.000</Net_Weight>
                  <WeightUnit>KGM</WeightUnit>
                  <Volume>0.000</Volume>
                  <Length>0.000</Length>
                  <Width>0.000</Width>
                  <Height>0.000</Height>
              </ProductUnit>
              <ProductBarcode>
                  <Barcode>8934673312509</Barcode>
                  <BarcodeUoM>HOP</BarcodeUoM>
                  <MainBarcode>X</MainBarcode>
              </ProductBarcode>
          </ProductItem>
      </ProductItems>
  </ns0:MT_Material>`;

  ngOnInit(): void {
    this.isShowTable = false;
    this.isDrag = true;
  }

  FindNodesChildren(x: Node, list: Map[]): void {
    for (const item of list) {
      if (item.parent === x.title) {
        const obj = { parent: item.parent, title: item.title, key: (item.key || item.title), children: [], isLeaf: true };
        this.FindNodesChildren(obj, list);
        if (obj.children.length !== 0) {
          obj.isLeaf = false;
        }
        x.children.push(obj);
      }
    }
  }

  CreateNodes(list: Map[], nodes: Node[]): void {
    let root: Node;
    list.forEach(value => {
      if (value.parent === '') {
        const obj = { title: value.title, key: (value.key || value.title), children: [] };
        root = obj;
      }
    });
    if (this.isUpdate === false) {
      this.TableName = (this.TableName || '') + '_' + root.title;
    }
    this.FindNodesChildren(root, list);
    nodes.push(root);
  }

  AddMap(key: string, value: any, list: Map[]): void {
    let flag = 1;
    list.forEach((val: Map) => {
      if (val.parent === key) {
        flag = 0;
      }
    });
    if (flag === 1) {
      if (Array.isArray(value) === true) {
        for (const item of value) {
          const obj = { parent: key, title: item };
          list.push(obj);
        }
      }
    }
  }


  // Convert object thành list object có dạng{parent: '', tittle: ''}
  ConvertObjectToList(objs: any, key: any, list: Map[]): void {
    // tslint:disable-next-line: forin
    for (const obj in objs) {
      if (Array.isArray(objs[obj]) === false && typeof (objs[obj]) !== 'string') {
        let keys: any;
        for (const k of Object.keys(objs)) {
          if (objs[k] === objs[obj]) {
            keys = k;
          }
        }
        this.ConvertObjectToList(objs[obj], keys, list);
      }
      if (Array.isArray(objs[obj]) === true) {
        for (const a of objs[obj]) {
          this.ConvertObjectToList(a, obj, list);
        }
      }
      // tslint:disable-next-line: align
      this.AddMap(key, Object.keys(objs), list);
    }
  }

  FindNode(value: Node, key: any, inputTitle: string): Node {
    if (value.title === key.title && value.parent === key.parentNode.title) {
      value.key = inputTitle;
      this.listOrigin.forEach(x => {
        if (x.parent === value.parent && x.title === value.title) {
          x.key = value.key;
        }
      });
      return value;
    }
    else {
      let res: Node;
      value.children.forEach(item => {
        if (!res) {
          res = this.FindNode(item, key, inputTitle);
        }
      });
      return res;
    }
  }

  FindRootNode(node: any): void {
    if (node.parentNode !== null) {
      this.FindRootNode(node.parentNode);
    }
    else {
      this.rootName = node.origin.title;
    }
  }

  nzDrag(event: NzFormatEmitEvent): void {
    this.FindRootNode(event.node);
    if (this.rootName !== 'Root') {
      this.NodeChange = '';
    }
    else {
      this.NodeChange = event.node;
    }
  }


  GetLinkOfNode(node: any, val: string): string {
    if (node.parentNode !== null) {
      val = node.title + '.' + val;
      val = this.GetLinkOfNode(node.parentNode, val);
    }
    return (val);
  }

  nzInputDragStart(event: NzFormatEmitEvent): void {
    this.isDrag = true;
    let link = this.GetLinkOfNode(event.node, '');
    link = link.slice(0, -1);
    this.MatchTitle = link;
  }

  nzEventDragEnd(event: NzFormatEmitEvent): void {
    let res: Node;
    if (this.NodeChange !== '') {
      this.NodesOrigin.forEach(value => {
        if (!res) {
          res = this.FindNode(value, this.NodeChange, this.MatchTitle);
        }
      });
      this.NodesOrigin = [...this.NodesOrigin];
    }
  }

  DisableOriginTree(event: NzFormatEmitEvent): void {
    this.isDrag = false;
  }

  FindLink(parent: string, list: Map[], title: string): any {
    let root = '';
    for (const item of list) {
      if (item.title === parent && title !== '') {
        root = this.FindLink(item.parent, list, item.title);
      }
    }
    let link: string;
    link = root + '.' + title;
    return link;
  }

  GetData(x: any, str: string): void{

  }

  ConvertListToObject(list: Map[]): void {
    list.forEach(x => {
      if (x.key !== undefined) {
        let i: string;
        i = this.FindLink(x.parent, list, x.title);
        i = i.slice(1, i.length);
        console.log(i);

      }
    });
  }

  SaveTree(): void {
    this.ConvertListToObject(this.listOrigin);
    localStorage.setItem(this.TableName, JSON.stringify(this.listOrigin));
    this.listOrigin = [];
    this.NodesOrigin = [];
    this.NodesInput = [];
    console.log(this.listOrigin);
    this.isShowTable = false;
  }

  UpdateTree(): void {
    this.isUpdate = true;
    this.isShowTable = true;
    const list = localStorage.getItem('_Root_ns0:MT_Material');
    this.listOrigin = JSON.parse(list);
    console.log(this.listOrigin);

    this.CreateNodes(this.listOrigin, this.NodesOrigin);

    const xml2js = require('xml2js');
    const parser = new xml2js.Parser({ explicitArray: false });
    this.jsonRaw = JSON.parse(this.json);
    let jsonTree: string;
    parser.parseString(this.xml, (Error: any, result: string) => {
      jsonTree = result;
    });
    this.ConvertObjectToList(jsonTree, '', this.listInput);
    this.CreateNodes(this.listInput, this.NodesInput);
  }

  CreateTree(): void {
    this.isUpdate = false;
    this.isShowTable = true;
    const xml2js = require('xml2js');
    const parser = new xml2js.Parser({ explicitArray: false });
    this.jsonRaw = JSON.parse(this.json);
    let jsonTree: string;
    parser.parseString(this.xml, (Error: any, result: string) => {
      jsonTree = result;
    });

    this.ConvertObjectToList(this.jsonRaw, '', this.listOrigin);
    this.CreateNodes(this.listOrigin, this.NodesOrigin);

    this.ConvertObjectToList(jsonTree, '', this.listInput);
    this.CreateNodes(this.listInput, this.NodesInput);
  }
}

