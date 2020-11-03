import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {
  progress$: Observable<any>;
  constructor(private $data: DataService) {}

  ngOnInit() {
    this.progress$ = this.$data.progress;
  }
}
