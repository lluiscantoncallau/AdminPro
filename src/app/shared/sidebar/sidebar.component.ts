import { SidebarService } from './../../services/services.index';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})

export class SidebarComponent implements OnInit {

  constructor(public service: SidebarService) { }

  ngOnInit(): void {
  }

}
