import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { TreeComponent } from './tree/tree.component';
/* import { NG_ENTITY_SERVICE_CONFIG } from '@datorama/akita-ng-entity-service';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store'; */
import { environment } from '../environments/environment';

registerLocaleData(en);

const nzModule = [
  NzLayoutModule,
  NzGridModule,
  NzButtonModule,
  NzListModule,
  NzSelectModule
]
@NgModule({
  declarations: [
    AppComponent,
    TreeComponent,
    CreateComponent,
    ListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NzTreeModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    nzModule,
    //environment.production ? [] : AkitaNgDevtools.forRoot(),
    /* AkitaNgRouterStoreModule.forRoot() */
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }, /* { provide: NG_ENTITY_SERVICE_CONFIG, useValue: { baseUrl: 'https://jsonplaceholder.typicode.com' }} */],
  bootstrap: [AppComponent]
})
export class AppModule { }
