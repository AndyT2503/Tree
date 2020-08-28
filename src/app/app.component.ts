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
  children: Map[];
  value?: any;
  isArray: boolean;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  Drag = true;
  RootName: string;
  Nodechange: any;
  listRoot: Map[] = [];
  listInput: Map[] = [];
  MatchTitle: string;
  NodesRoot: Node[] = [];
  NodesInput: Node[] = [];
  CheckClick = false;
  jsonRaw: any;
  jsonSave: any;

  json = `{"Root":{
    "groupId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "whseid": "string",
    "storerKey": "string",
    "sku1": "string",
    "description": "string",
    "stdNetWeight": 0,
    "stdGrossWeight": 0,
    "stdCube": 0,
    "notes": "string",
    "wmsSyncDate": "2020-08-27T04:55:24.252Z",
    "wmsSyncStatus": "string",
    "wmsSyncError": "string",
    "tmsSyncDate": "2020-08-27T04:55:24.252Z",
    "tmsSyncStatus": "string",
    "tmsSyncError": "string",
    "sapMessageIdItem": "string",
    "sapMaterialCode": "string",
    "sapMaterialDesc": "string",
    "sapMaterialLongText": "string",
    "sapMaterialGroup": "string",
    "sapMaterialGroupDesc": "string",
    "sapBaseUom": "string",
    "sapProductHierachy": "string",
    "sapQtyPerRsc": "string",
    "sapQtyPerPal": "string",
    "sapGrossWeight": "string",
    "sapNetWeight": "string",
    "sapWeightUnit": "string",
    "sapCreationDate": "string",
    "sapVolumn": "string",
    "sapVolumnUnit": "string",
    "sapLastUpdate": "string",
    "sapOldMaterialCode": "string",
    "sapUpceancode": "string",
    "sapShelfLife": "string",
    "sapShelfLifeInd": "string",
    "sapStatus": "string",
    "sapLotIndicator": "string"
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



  FindChildren(x: Node, list: Map[]): void {
    for (const item of list) {
      if (item.parent === x.title) {
        const obj = { parent: item.parent, title: item.title, key: item.title, children: [], isLeaf: true };
        this.FindChildren(obj, list);
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
        const obj = { title: value.title, key: value.title, children: [] };
        root = obj;
      }
    });
    this.RootName = root.title;
    this.FindChildren(root, list);
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
          let obj = { parent: key, title: item, children: [] };
          list.push(obj);
        }
      }
    }
  }



  CheckObj(objs: any, key: any, list: Map[]): void {
    // tslint:disable-next-line: forin
    for (const obj in objs) {
      if (Array.isArray(objs[obj]) === false && typeof (objs[obj]) !== 'string') {
        let keys: any;
        for (const k of Object.keys(objs)) {
          if (objs[k] === objs[obj]) {
            keys = k;
          }
        }
        this.CheckObj(objs[obj], keys, list);
      }
      if (Array.isArray(objs[obj]) === true) {
        for (const a of objs[obj]) {
          this.CheckObj(a, obj, list);
        }
      }

      // tslint:disable-next-line: align
      this.AddMap(key, Object.keys(objs), list);
    }
  }

  ngOnInit(): void {
    const xml2js = require('xml2js');
    const parser = new xml2js.Parser({ explicitArray: false });

    this.jsonRaw = JSON.parse(this.json);
    let jsonTree: string;
    parser.parseString(this.xml, function (err, result) {
      jsonTree = result;
    });
    this.CheckObj(this.jsonRaw, '', this.listRoot);
    this.CreateNodes(this.listRoot, this.NodesRoot);
    this.CheckObj(jsonTree, '', this.listInput);
    this.CreateNodes(this.listInput, this.NodesInput);
    console.log(this.NodesRoot);
  }


  FindNode(value: Node, key: any, inputTitle: string): Node {
    if (value.title === key.title && value.parent === key.parentNode.title) {
      value.key = inputTitle;
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

  nzDrop(event: NzFormatEmitEvent): void {
    console.log(event);
  }

  nzDrag(event: NzFormatEmitEvent): void {
    if (event.node.origin.parent !== 'Root') {
      this.Nodechange = '';
    }
    else {
      this.Nodechange = event.node;
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
    this.Drag = true;
    let link = this.GetLinkOfNode(event.node, '');
    link = link.slice(0, -1);
    this.MatchTitle = link;
  }

  nzEventDragEnd(event: NzFormatEmitEvent): void {
    let res: Node;
    if (this.Nodechange !== '') {
      this.NodesRoot.forEach(value => {
        if (!res) {
          res = this.FindNode(value, this.Nodechange, this.MatchTitle);
        }
      });
      this.NodesRoot = [...this.NodesRoot];
      this.UpdateJsonReturn();
    }
  }

  nzRootStart(event: NzFormatEmitEvent): void {
    this.Drag = false;
  }

  UpdateJsonReturn(): void {
    const list = this.NodesRoot[0].children;
    const newObj = {};
    list.forEach(x => {
      newObj[x.title] = x.key;
    });
    this.jsonSave = newObj;
  }

  SaveObj(): void{
    localStorage.setItem(this.RootName, JSON.stringify(this.jsonSave));
  }
}

