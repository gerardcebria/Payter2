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
  arrayShow : Array<Boolean> = [];
  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.dataService.listItems().subscribe(items => {
        this.$items.next(items);
      });
    });
  }

  onSelectItem(id: number) {
    this.router.navigate(['/items','details', id]);
  }

  onNewItem() {
    this.router.navigate(['new']);
  }
}
