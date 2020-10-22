import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  constructor(private router: Router) { }

  public isMobileLayout = false;
  ngOnInit() {
    this.isMobileLayout = window.innerWidth <= 475;
    window.onresize = () => this.isMobileLayout = window.innerWidth <= 475;
  }
  public printPage = () => (window.print());
  // public windowClose = () => (open(location, '_self').close());
  public closewin() {
    if (navigator.userAgent.indexOf('Firefox') !== -1 || navigator.userAgent.indexOf('Chrome') !== -1) {
        window.location.href = 'about:blank';
        window.close();
    } else {
        window.opener = null;
        window.open('', '_self');
        window.close();
    }
}
}
