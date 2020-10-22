import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class SelectionComponent implements OnInit {

  constructor(private router: Router) { }

  public isMobileLayout = false;
  ngOnInit() {
    window.onresize = () => this.isMobileLayout = window.innerWidth <= 475;
  }

}
