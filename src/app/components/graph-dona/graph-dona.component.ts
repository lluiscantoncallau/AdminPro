import { Component, OnInit, Input } from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-graph-dona',
  templateUrl: './graph-dona.component.html',
  styles: []
})
export class GraphDonaComponent implements OnInit {

  @Input() public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input() public doughnutChartData: MultiDataSet = [
    [350, 450, 100],
    [50, 150, 120],
    [250, 130, 70],
  ];
  @Input() public doughnutChartType: ChartType = 'doughnut';

  constructor() {
   }

  ngOnInit(): void {
  }

}
