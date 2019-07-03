import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BehaviorSubject, Subject } from 'rxjs';

import { DataItem } from 'app/model';
import { DataService } from 'app/services/data';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html'
})
export class OverviewComponent implements OnInit {

  $items: Subject<DataItem[]> = new BehaviorSubject<DataItem[]>([]);
  /*Auxiliar array for the option button*/
  arrayShow: Array<Boolean> = [];
  
  /*Vars for the filter system*/
  filterList = []
  filterSelect: string = "Name";
  filterValue: string = "";
  
  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.loadItemList();
  }

  onSelectItem(id: number) {
    this.router.navigate(['/items', 'details', id]);
  }

  onNewItem() {
    this.router.navigate(['new']);
  }

  loadItemList(){
    this.route.params.subscribe(params => {
      this.dataService.listItems().subscribe(items => {
        this.$items.next(items);
      });
    });
  }

  searchByFilter(){
    var newFilter = {
      filter: this.filterSelect,
      value: this.filterValue
    } 
    this.filterList.push(newFilter);
  }

  deleteFilter(filter: any) {
    let index = 0;
    this.filterList.forEach(element => {
      if (filter.value === element.value &&
        filter.filter === element.filter) {
        console.log(filter + index);
        this.filterList.splice(index, 1);
      }
      index++;
    });
  }

  deleteItem(idValue: number){
    var idNumber: number = +idValue;
    this.dataService.getItem(idNumber).subscribe(item => {
      this.dataService.deleteItem(item);
      this.loadItemList();
    });
  }

  /*
  searchByName(name: string){
    this.route.params.subscribe(params => {
      this.dataService.listItems().subscribe(items => {
        if (item.includes(name)) { 
          
          this.$items.next(items);
        }
      });
    });
  }*/

}
