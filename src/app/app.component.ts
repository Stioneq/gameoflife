import {Component, OnInit} from '@angular/core';
import {getGeneration} from './game/logic';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  ngOnInit(): void {
    getGeneration([
      [1, 0, 0, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 0, 0, 1]
    ], 1);

  }


}
