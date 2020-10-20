import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nric',
  templateUrl: './nric.component.html',
  styleUrls: ['./nric.component.scss']
})
export class NricComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
