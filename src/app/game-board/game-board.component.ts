import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {getGeneration} from '../game/logic';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit, AfterViewInit {

  start;
  frames = 0;
  fps = 0;
  board = [[1, 0, 0, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [1, 0, 0, 1]
  ];
  generationIterator = getGeneration(this.board);

  @ViewChild('canvas') canvasElem: ElementRef;

  constructor() {
  }

  ngOnInit() {


  }

  ngAfterViewInit(): void {

    requestAnimationFrame(this.tick.bind(this));
    const canvas = this.canvasElem.nativeElement;
    canvas.width = parseInt(canvas.offsetWidth, 10);
    canvas.height = parseInt(canvas.offsetWidth, 10);

  }


  tick(timestamp) {
    if (!this.start) {
      this.start = performance.now();
      this.fps = 0;
    }
    const progress = (performance.now() - this.start);
    if (progress > 1000) {
      this.drawBoard();
      this.start = performance.now();
    }


    requestAnimationFrame(this.tick.bind(this));
  }

  private drawBoard() {
    const board = this.generationIterator.next().value;
    debugger;
    const canvas = this.canvasElem.nativeElement;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    const size = Math.min(w / board.length, h / board.length) * 0.1;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === 1) {
          ctx.fillRect(i * (size + 20), j * (size + 20), size, size);
        }
      }
    }
  }
}
