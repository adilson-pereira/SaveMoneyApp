import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { Chart } from 'chart.js';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
   // gastos: any;
   // descricao: any;
   // descricao: Array<string>;
   // gastos: Array<number>;
  @ViewChild('doughnutCanvas') doughnutCanvas;
  barChart: any;
  doughnutChart: any;
  descricao:any= [];
  gastos:any = [];

  constructor(public navCtrl: NavController, private sqlite: SQLite) {

  }
    

  ionViewWillEnter() {
      //this.getData();
    //console.log(this.descricao);
  }
    ionViewDidLoad() {
        //this.getData();
        var descricao:any = [];
        var gastos = [];
            
        this.sqlite.create({
            name: 'ionicdb.db',
            location: 'default'
        }).then((db: SQLiteObject) => {
            db.executeSql('SELECT description FROM gastos WHERE type="Expense" GROUP BY description ORDER BY description', {})
            .then(res => {
            //let descricao;
            for(var i=0; i<res.rows.length; i++) {
                descricao.push(res.rows.item(i).description);
                console.log(descricao[i]);
            }
            })
            .catch(e => console.log(e));
            
            db.executeSql('SELECT SUM(amount) as gasto FROM gastos WHERE type="Expense" GROUP BY description ORDER BY description', {})
            .then(res => {
            //this.gastos;
            for(var i=0; i<res.rows.length; i++) {
                gastos.push(parseInt(res.rows.item(i).gasto));
                console.log(gastos[i])
            }
            })
        }).catch(e => console.log(e));
        
        this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
 
            type: 'doughnut',
            data: {
                labels: descricao,
                datasets: [{
                    label: '# of Votes',
                    data: gastos
                    }]
            }

        });

    }
    /*getData() {
        this.sqlite.create({
            name: 'ionicdb.db',
            location: 'default'
        }).then((db: SQLiteObject) => {

            db.executeSql('SELECT description FROM gastos WHERE type="Expense" GROUP BY description ORDER BY description', {})
            .then(res => {
            this.descricao = [];
            for(var i=0; i<res.rows.length; i++) {
                this.descricao.push(res.rows.item(i).description);
                //console.log(this.descricao[0]);
            }
            })
            .catch(e => console.log(e));
            
            db.executeSql('SELECT SUM(amount) as gasto FROM gastos WHERE type="Expense" GROUP BY description ORDER BY description', {})
            .then(res => {
            this.gastos = [];
            for(var i=0; i<res.rows.length; i++) {
                this.gastos.push(parseInt(res.rows.item(i).gasto));
                //console.log(this.gastos[0])
            }
            })
        }).catch(e => console.log(e));
    }*/
    
}
