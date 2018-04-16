import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { AuthService } from '../shared/auth.service';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable  } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase/app';
import { ChartLine } from './chartLine';
import {DataTableModule} from "angular2-datatable";
import {NgxPaginationModule} from 'ngx-pagination';
import { BadPayer } from './badPayer';
import { forEach } from '@firebase/util';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})

export class DashboardComponent implements OnInit {
  balantaConturii: FirebaseListObservable<any[]>;
  solduri: FirebaseListObservable<any[]>;
  rapoartes: FirebaseListObservable<any[]>;
  placeholderText = "dashboard works";
  public filterQuery = "";
  user = null;
 
  
  

  public lineChartLabels:Array<any> = [];
  public barChartLabels:Array<any> = [];
  public barChartData: Array<any> =[];
  public barChartType:string = 'bar';
  public lineChartOptions:any = {
    responsive: true
  };

  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  public chartLines: Array<ChartLine>;
  constructor(private auth: AuthService,
    public db: AngularFireDatabase) { 

    }

  ngOnInit() {
      
      this.chartLines = new Array<ChartLine>();

      this.chartLines[0] = { label:'Utilizatori activi', data: [] } as ChartLine;
     // this.chartLines[1] = { label:'Activi la sfarsit', data: [] } as ChartLine;
  }

  loginWithGoogle() {
    this.auth.loginWithGoogle().then(result => {
      console.log(result);
      this.displayBadPayers();
    });
  }

  displayBadPayers() {
    this.auth.getAuthState().subscribe(
      (user) => {
        this.user = user;
      });

      this.badPayers = this.db.list('/users/BadPayers');
      this.badPayers.subscribe(snapshot => this.snapshotToArray(snapshot));

      // var rapoarte = this.db.list('/rapoarte');
      // rapoarte.subscribe(snapshot => {
      //   this.lineChartData = new Array<any>();
      //   var tempLineChartData = new Array<any>();
      //   var tempLineChartLabels = new Array<any>();
      //   snapshot.forEach(childSnapshot => {
      //       this.lineChartData.push(childSnapshot.ActiviLaSfarsit);
      //       this.lineChartLabels.push(new Date(childSnapshot.DataSfarsit).toLocaleDateString());
      //       this.lineChartDataSfarsit.push(childSnapshot.ActiviLaSfarsit);
      //   });

      //   this.lineChartLabels = this.lineChartLabels.sort((x, y) => {
      //     if(x > y) return 1;
      //     else if (x < y) return -1;
      //     else return 0;
      //   });
      // })

      var rapoarte = this.db.list('/rapoarte');
      rapoarte.subscribe(snapshot => {
        var tempLineChartData = new Array<any>();
        snapshot.forEach(childSnapshot => {
          tempLineChartData.push({
            Valoare: childSnapshot.ActiviLaInceput,
            Data: new Date(childSnapshot.DataInceput),
          });
          // tempLineChartData.push({
          //   Valoare: childSnapshot.ActiviLaSfarsit,
          //   Data: new Date(childSnapshot.DataSfarsit),
          // });
        });

        tempLineChartData = tempLineChartData.sort((a, b) => {
            var ta = a.Data.getTime();
            var tb = b.Data.getTime();
            return ta - tb;
        });

        this.lineChartData = new Array<any>();
        tempLineChartData.forEach(lcd => {
          this.lineChartData.push(lcd.Valoare);
          this.lineChartLabels.push(lcd.Data.toLocaleDateString());
        });
         
      })

      // var solduri = this.db.list('/balantaConturi');
      // solduri.subscribe(snapshot => {
      //   var balantaCont = new  Array<any>();
      //   snapshot.forEach(childSnapshot => {
      //     balantaCont.push({ 
      //       Credit: childSnapshot.SoldCredit,
      //       Debit: childSnapshot.SoldDebit,
      //       Data: new Date(childSnapshot.Data).toLocaleDateString()
      //     });
      //   })
      //   this.barChartData = new Array<any>();
      // balantaCont.forEach(lcd => {
      //     this.barChartData.push(lcd.Credit);
      //    this.barChartData.push(lcd.Debit);
      //    this.barChartLabels.push(lcd.Data);
      //   });
      // });
      
      //pieChartData
  }

  displayBalantaConturi() {
    this.auth.getAuthState().subscribe(
      (user) => {
        this.user = user;
      });

      this.balantaConturii = this.db.list('/balantaConturi');
  }

  displayRapoarte() {
    this.auth.getAuthState().subscribe(
      (user) => {
        this.user = user;
      });

      this.rapoartes = this.db.list('/rapoarte');
      //pt fiecare activLaInceput 
  }
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

  badPayers: FirebaseListObservable<any[]>;
  badPayersList: Array<BadPayer> = new Array<BadPayer>();
  filteredBadPayersList: Array<BadPayer> = new Array<BadPayer>();
  _listFilter: string;
  get listFilter(): string {
      return this._listFilter;
  }
  set listFilter(value: string) {
      this._listFilter = value;
      this.filteredBadPayersList = this.listFilter ? this.performFilter(this.listFilter) : this.badPayersList;
  }

  private snapshotToArray(snapshot) { 
    this.badPayersList = new Array<BadPayer>();
    snapshot.forEach(childSnapshot => {
        this.badPayersList.push(childSnapshot);
    });
    this.filteredBadPayersList = this.badPayersList;
  };

  private performFilter(filterBy: string): Array<any> {
    filterBy = filterBy.toLocaleLowerCase();
    return this.badPayersList.filter((badPayer: any) =>
        badPayer.Nume.toLocaleLowerCase().indexOf(filterBy) !== -1
      );
  }

  public lineChartDataBalanta:Array<any>[];
  public lineChartData: any[];
  public lineChartTypeBalanta:string = 'line';
  public pieChartData:Array<any> = [];

 
}

