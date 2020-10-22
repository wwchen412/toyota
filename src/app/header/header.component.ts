import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }
  public isMobileLayout = false;
  ngOnInit() {
    this.isMobileLayout = window.innerWidth <= 475;
    window.onresize = () => this.isMobileLayout = window.innerWidth <= 475;
  }

}
