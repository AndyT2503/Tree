import { Component, OnInit } from '@angular/core';

interface Node {
  title: string;
  children: Node[];
  isLeaf?: boolean;
}

interface Map {
  parent: string;
  title: any;
  children: Map[];
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  list: Map[] = [];

  Nodes: Node[] = [];

  FindChildren(x: Node): void {
    for (const item of this.list) {
      if (item.parent === x.title) {
        const obj = { title: item.title, children: [], isLeaf: true };
        this.FindChildren(obj);
        if (obj.children.length !== 0) {
          obj.isLeaf = false;
        }
        x.children.push(obj);
      }
    }
  }

  CreateNodes(): void {
    let root: Node;
    this.list.forEach(value => {
      if (value.parent === '') {
        const obj = { title: value.title, children: [] };
        root = obj;
      }
    });
    this.FindChildren(root);
    this.Nodes.push(root);
    console.log(JSON.stringify(this.Nodes));
  }

  AddMap(key: string, value: any): void {
    let flag = 1;
    this.list.forEach((val: Map) => {
      if (val.parent === key) {
        flag = 0;
      }
    });
    if (flag === 1) {
      if (Array.isArray(value) === true) {
        for (const item of value) {
          let obj = { parent: key, title: item, children: [] };
          this.list.push(obj);
        }
      }
    }
  }



  CheckObj(objs: any, key: any): void {
    // tslint:disable-next-line: forin
    for (const obj in objs) {
      if (Array.isArray(objs[obj]) === false && typeof (objs[obj]) !== 'string') {
        let keys: any;
        for (const k of Object.keys(objs)) {
          if (objs[k] === objs[obj]) {
            keys = k;
          }
        }
        this.CheckObj(objs[obj], keys);
      }
      if (Array.isArray(objs[obj]) === true) {
        for (const a of objs[obj]) {
          console.log(a);
          this.CheckObj(a, obj);
        }
      }
      // tslint:disable-next-line: align
      this.AddMap(key, Object.keys(objs));
    }
  }

  ngOnInit(): void {
    const xml2js = require('xml2js');
    const parser = new xml2js.Parser({ explicitArray: false });
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
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

    let jsonTree: string;
    parser.parseString(xml, function (err, result) {
      jsonTree = result;
    });
    this.CheckObj(jsonTree, '');
    this.CreateNodes();
  }

  nzEvent($event) {

  }
}

