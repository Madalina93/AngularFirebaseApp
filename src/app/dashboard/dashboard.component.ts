import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { AuthService } from '../shared/auth.service';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable  } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase/app';
import { ChartLine } from './chartLine';
import {DataTableModule} from "angular2-datatable";
import {NgxPaginationModule} from 'ngx-pagination';
import { BadPayer } from './badPayer';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  balantaConturii: FirebaseListObservable<any[]>;
  placeholderText = "dashboard works";
  public filterQuery = "";
  user = null;

  //public lineChartLabels:Array<any> = ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie','Noiembrie','Decembrie'];
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
    
      // firebase call -> aduce toti rau platnicii
      // => statisticiRauPlatnici; 
      
      this.chartLines = new Array<ChartLine>();

      this.chartLines[0] = { label:'Rau Platnici', data: [this.balantaConturii, 60] } as ChartLine;
      this.chartLines[1] = { label:'Total Restante', data: [28, 48, 40, 19, 86, 27, 90, 91, 92, 93, 94] } as ChartLine;
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
  }

  displayBalantaConturi() {
    this.auth.getAuthState().subscribe(
      (user) => {
        this.user = user;
      });

      this.balantaConturii = this.db.list('/balantaConturi');
  }
 
  // public randomize():void {
  //   let _lineChartData:Array<any> = new Array(this.lineChartData.length);
  //   for (let i = 0; i < this.lineChartData.length; i++) {
  //     _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
  //     for (let j = 0; j < this.lineChartData[i].data.length; j++) {
  //       _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
  //     }
  //   }
  //   this.lineChartData = _lineChartData;
  // }
 
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
}
