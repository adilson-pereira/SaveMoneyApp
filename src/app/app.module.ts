import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SQLite } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PreferencesPage } from '../pages/preferences/preferences';
import { ScannerPage } from '../pages/scanner/scanner';
import { LogoutPage } from '../pages/logout/logout';
import { GastosPage } from '../pages/gastos/gastos';
import { EditDataPage } from '../pages/edit-data/edit-data';
import { AddDataPage } from '../pages/add-data/add-data';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    GastosPage,
    LogoutPage,
    ScannerPage,
    PreferencesPage,
    AddDataPage,
    EditDataPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    GastosPage,
    LogoutPage,
    ScannerPage,
    PreferencesPage,
    AddDataPage,
    EditDataPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    Toast,
    BarcodeScanner
  ]
})
export class AppModule {}
