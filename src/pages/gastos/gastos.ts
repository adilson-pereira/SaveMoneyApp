import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { EditDataPage } from '../edit-data/edit-data';
import { AddDataPage } from '../add-data/add-data';

@IonicPage()
@Component({
  selector: 'page-gastos',
  templateUrl: 'gastos.html',
})
export class GastosPage {
gastos: any = [];
totalIncome = 0;
totalExpense = 0;
saldo = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private sqlite: SQLite) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GastosPage');
    this.getData();
  }
  ionViewWillEnter() {
    this.getData();
  }

  getData() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS gastos(rowid INTEGER PRIMARY KEY, date TEXT, type TEXT, description TEXT, amount INT)', {})
      .then(res => console.log('Executed SQL'))
      .catch(e => console.log(e));
      db.executeSql('SELECT * FROM gastos ORDER BY rowid DESC', {})
      .then(res => {
        this.gastos = [];
        for(var i=0; i<res.rows.length; i++) {
          this.gastos.push({rowid:res.rows.item(i).rowid,date:res.rows.item(i).date,type:res.rows.item(i).type,description:res.rows.item(i).description,amount:res.rows.item(i).amount})
        }
      })
      .catch(e => console.log(e));

      db.executeSql('SELECT SUM(amount) AS totalIncome FROM gastos WHERE type="Income"', {})
      .then(res => {
        if(res.rows.length>=0) {
          this.totalIncome = parseInt(res.rows.item(0).totalIncome);
          this.saldo = this.totalIncome-this.totalExpense;
        }
      })
      .catch(e => console.log(e));
      
      db.executeSql('SELECT SUM(amount) AS totalExpense FROM gastos WHERE type="Expense"', {})
      .then(res => {
        if(res.rows.length>=0) {
          this.totalExpense = parseInt(res.rows.item(0).totalExpense);
          this.saldo = this.totalIncome-this.totalExpense;
          //console.log(this.saldo);
        }
      })
    }).catch(e => console.log(e));
    
  }
  
  addData() {
    this.navCtrl.push(AddDataPage);
  }
  
  editData(rowid) {
    this.navCtrl.push(EditDataPage, {
      rowid:rowid
    });
  }

deleteData(rowid) {
  this.sqlite.create({
    name: 'ionicdb.db',
    location: 'default'
  }).then((db: SQLiteObject) => {
    db.executeSql('DELETE FROM gastos WHERE rowid=?', [rowid])
    .then(res => {
      console.log(res);
      this.getData();
    })
    .catch(e => console.log(e));
  }).catch(e => console.log(e));
}

  

}
