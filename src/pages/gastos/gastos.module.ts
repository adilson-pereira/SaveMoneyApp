import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GastosPage } from './gastos';
import { EditDataPage } from '../edit-data/edit-data';
import { AddDataPage } from '../add-data/add-data';


@NgModule({
  declarations: [
    GastosPage,
    AddDataPage,
    EditDataPage
  ],
  imports: [
    IonicPageModule.forChild(GastosPage),
  ],
})
export class GastosPageModule {}
