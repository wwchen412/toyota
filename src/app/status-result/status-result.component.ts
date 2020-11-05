import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-status-result',
  templateUrl: './status-result.component.html',
  styleUrls: ['./status-result.component.css']
})
export class StatusResultComponent implements OnInit {
  constructor(private $data: DataService) {}

  ngOnInit(): void {
    this.$data.getApplication().subscribe(res => {
      console.log('res', res);
    });
  }
}
