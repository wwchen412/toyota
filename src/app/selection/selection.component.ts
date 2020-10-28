import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class SelectionComponent implements OnInit {

  constructor(  ) { }

  public isMobileLayout = false;
  ngOnInit() {
    window.onresize = () => this.isMobileLayout = window.innerWidth <= 475;
  }

}
