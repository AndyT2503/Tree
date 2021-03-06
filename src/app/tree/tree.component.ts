import { Component, OnInit, Input } from '@angular/core';
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
  isLeaf?: boolean;
}

const xml2js = require('xml2js');
const dotProp = require('dot-prop');
@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {

  listLeaf: any[] = [];
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

  json = `{"Root": {
    "Sku": {
      "GroupId": null,
      "Whseid": null,
      "StorerKey": null,
      "Sku1": null,
      "Description": null,
      "StdNetWeight": 0,
      "StdGrossWeight": 0,
      "StdCube": 0,
      "Notes": null,
      "WmsSyncDate": null,
      "WmsSyncStatus": null,
      "WmsSyncError": null,
      "TmsSyncDate": null,
      "TmsSyncStatus": null,
      "TmsSyncError": null,
      "SapMessageIdItem": null,
      "SapMaterialCode": null,
      "SapMaterialDesc": null,
      "SapMaterialLongText": null,
      "SapMaterialGroup": null,
      "SapMaterialGroupDesc": null,
      "SapBaseUom": null,
      "SapProductHierachy": null,
      "SapQtyPerRsc": null,
      "SapQtyPerPal": null,
      "SapGrossWeight": null,
      "SapNetWeight": null,
      "SapWeightUnit": null,
      "SapCreationDate": null,
      "SapVolumn": null,
      "SapVolumnUnit": null,
      "SapLastUpdate": null,
      "SapOldMaterialCode": null,
      "SapUpceancode": null,
      "SapShelfLife": null,
      "SapShelfLifeInd": null,
      "SapStatus": null,
      "SapLotIndicator": null,
      "Group": null,
      "Orderdetail": [],
      "ClientId": null,
      "ClientCode": null,
      "CreatedBy": null,
      "CreatedDate": null,
      "Creator": null,
      "ModifiedBy": null,
      "ModifiedDate": null,
      "Modifier": null,
      "Id": "00000000-0000-0000-0000-000000000000"
    },
    "SkuGroup": {
      "Whseid": null,
      "StorerKey": null,
      "Code": null,
      "Name": null,
      "WmsSyncDate": null,
      "WmsSyncStatus": null,
      "WmsSyncError": null,
      "TmsSyncDate": null,
      "TmsSyncStatus": null,
      "TmsSyncError": null,
      "Sku": [],
      "ClientId": null,
      "ClientCode": null,
      "CreatedBy": null,
      "CreatedDate": null,
      "Creator": null,
      "ModifiedBy": null,
      "ModifiedDate": null,
      "Modifier": null,
      "Id": "00000000-0000-0000-0000-000000000000"
    },
    "Pack": {
      "Whseid": null,
      "Storerkey": null,
      "Sku": null,
      "Uom": null,
      "NumeratorConversion": 0,
      "DenominatorConversion": 0,
      "GrossWeight": 0,
      "NetWeight": 0,
      "Volume": 0,
      "Length": 0,
      "Width": 0,
      "Height": 0,
      "WmsSyncDate": null,
      "WmsSyncStatus": null,
      "WmsSyncError": null,
      "TmsSyncDate": null,
      "TmsSyncStatus": null,
      "TmsSyncError": null,
      "ClientId": null,
      "ClientCode": null,
      "CreatedBy": null,
      "CreatedDate": null,
      "Creator": null,
      "ModifiedBy": null,
      "ModifiedDate": null,
      "Modifier": null,
      "Id": "00000000-0000-0000-0000-000000000000"
    },
    "ProductBarcode": {
      "Whseid": null,
      "Storerkey": null,
      "Sku": null,
      "Barcode": null,
      "BarcodeUoM": null,
      "MainBarcode": null,
      "WmsSyncDate": null,
      "WmsSyncStatus": null,
      "WmsSyncError": null,
      "TmsSyncDate": null,
      "TmsSyncStatus": null,
      "TmsSyncError": null,
      "ClientId": null,
      "ClientCode": null,
      "CreatedBy": null,
      "CreatedDate": null,
      "Creator": null,
      "ModifiedBy": null,
      "ModifiedDate": null,
      "Modifier": null,
      "Id": "00000000-0000-0000-0000-000000000000"
    },
    "Supplier": {
      "Whseid": null,
      "Code": null,
      "Name": null,
      "Address": null,
      "CountryCode": null,
      "ProvinceCode": null,
      "DistrictCode": null,
      "WardCode": null,
      "TaxCode": null,
      "PhoneNumber": null,
      "WmsSyncDate": null,
      "WmsSyncStatus": null,
      "WmsSyncError": null
    },
    "Order": {
      "SoldToId": null,
      "ShipToId": null,
      "ConsigneeId": null,
      "SupplierId": null,
      "Whseid": null,
      "StorerKey": null,
      "OrderKey": null,
      "OmsType": null,
      "ExternalKey1": null,
      "ExternalKey2": null,
      "Priority": 0,
      "Gate": null,
      "Door": null,
      "CarrierCode": null,
      "TrailerNumber": null,
      "DriverName": null,
      "PhoneNumber": null,
      "OrderDate": null,
      "BeginTime": null,
      "EndTime": null,
      "RequestShipDate": null,
      "ActualShipDate": null,
      "DeliveryDate": null,
      "ExpectedReceiptDate": null,
      "ReceiptDate": null,
      "Status": null,
      "Type": null,
      "WmsSyncDate": null,
      "WmsSyncStatus": null,
      "WmsSyncError": null,
      "TmsSyncDate": null,
      "TmsSyncStatus": null,
      "TmsSyncError": null,
      "Userdefine1": null,
      "Userdefine2": null,
      "Userdefine3": null,
      "Userdefine4": null,
      "Userdefine5": null,
      "Userdefine6": null,
      "Userdefine7": null,
      "Userdefine8": null,
      "Userdefine9": null,
      "Userdefine10": null,
      "Consignee": null,
      "ShipTo": null,
      "SoldTo": null,
      "Supplier": null,
      "Orderdetail": [],
      "Tripdetail": [],
      "ClientId": null,
      "ClientCode": null,
      "CreatedBy": null,
      "CreatedDate": null,
      "Creator": null,
      "ModifiedBy": null,
      "ModifiedDate": null,
      "Modifier": null,
      "Id": "00000000-0000-0000-0000-000000000000"
    }
  }}`;
  @Input() xml: string;

  ngOnInit(): void {
    this.isShowTable = false;
    this.isDrag = true;
    this.isUpdate = false;
    this.isShowTable = true;

    const parser = new xml2js.Parser({ explicitArray: false });

    this.jsonRaw = JSON.parse(this.json);
    let jsonTree: string;
    parser.parseString(this.xml, (Error: any, result: string) => {
      jsonTree = result;
    });

    this.ConvertObjectToList(this.jsonRaw, '', this.listOrigin);
    this.CheckIsLeaf(this.listOrigin);
    console.log(this.listOrigin);
    this.GetValueOfList(this.listOrigin, this.jsonRaw);
    this.CreateNodes(this.listOrigin, this.NodesOrigin);

    this.ConvertObjectToList(jsonTree, '', this.listInput);
    this.CheckIsLeaf(this.listInput);
    this.CreateNodes(this.listInput, this.NodesInput);
  }

  FindNodesChildren(x: Node, list: Map[]): void {
    for (const item of list) {
      if (item.parent === x.title) {
        const obj = { parent: item.parent, title: item.title, key: (item.key || item.title), children: [], isLeaf: item.isLeaf };
        if (item.isLeaf === false) {
          this.FindNodesChildren(obj, list);
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

  CheckIsLeaf(list: Map[]): void {
    list.forEach(item => {
      let check = 0;
      this.listLeaf.forEach(leaf => {
        if (item.parent === leaf.parent && item.title === leaf.title) {
          check = 1;
        }
      });
      if (check === 1) {
        item.isLeaf = true;
      }
      else { item.isLeaf = false; }
    });
  }

  GetValueOfList(list: Map[], json: any): void {
    list.forEach(x => {
      let i: string;
      i = this.FindLink(x.parent, list, x.title);
      i = i.slice(1, i.length);
      const arr = i.split('.');
      let a = json;
      for (const item of arr) {
        if (item !== arr[arr.length - 1]) {
          a = a[item];
        }
        else if (a && a[item]) {
          x.key = a[item];

        }
        else {
          x.key = 'undefined';
        }
      }
    });
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
      if ((Array.isArray(objs[obj]) === true && objs[obj].length === 0) || typeof (objs[obj]) === 'string'
        || objs[obj] === null || typeof (objs[obj]) === 'number') {
        const leaf = { parent: key, title: obj };
        this.listLeaf.push(leaf);
      }
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
    val = node.title + '.' + val;
    if (node.parentNode !== null) {
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
      if (item.title === parent && title !== '' && item.isLeaf === false) {
        root = this.FindLink(item.parent, list, item.title);
      }
    }
    let link: string;
    link = root + '.' + title;
    return link;
  }


  UpdateValueOfObject(list: Map[]): void {
    list.forEach(x => {
      if (x.key !== '') {
        let i: string;
        i = this.FindLink(x.parent, list, x.title);
        i = i.slice(1, i.length);
        dotProp.set(this.jsonRaw, i, x.key);
      }
    });
  }

  SaveTree(): void {
    this.UpdateValueOfObject(this.listOrigin);
    let str = JSON.stringify(this.jsonRaw);
    str = str.replace('{"Root":', '');
    str = str.slice(0, -1);
    localStorage.setItem(this.TableName, str);
    this.listOrigin = [];
    this.NodesOrigin = [];
    this.NodesInput = [];
    this.isShowTable = false;
  }

  UpdateTree(): void {
    this.isUpdate = true;
    this.isShowTable = true;
    let json = localStorage.getItem(this.TableName);
    json = '{"Root":' + json + '}';
    this.jsonRaw = JSON.parse(json);
    this.ConvertObjectToList(this.jsonRaw, '', this.listOrigin);
    this.GetValueOfList(this.listOrigin, this.jsonRaw);
    this.CreateNodes(this.listOrigin, this.NodesOrigin);
    const parser = new xml2js.Parser({ explicitArray: false });
    let jsonTree: string;
    parser.parseString(this.xml, (Error: any, result: string) => {
      jsonTree = result;
    });
    this.ConvertObjectToList(jsonTree, '', this.listInput);
    this.CreateNodes(this.listInput, this.NodesInput);
  }
}
