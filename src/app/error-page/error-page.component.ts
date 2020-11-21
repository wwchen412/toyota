import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
  public errorMsg$;
  constructor(private $data: DataService) {}

  ngOnInit(): void {
    this.errorMsg$ = this.$data.errMsg;
  }
}
