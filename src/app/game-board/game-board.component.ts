import {AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {getGeneration} from '../game/logic';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit, AfterViewInit {

  start;
  frames = 0;
  fps = 0;
  board = [[]];
  generationIterator;

  @ViewChild('canvas') canvasElem: ElementRef;

  constructor(private ngZone: NgZone) {
  }

  ngOnInit() {
    this.board = Array(50)
      .fill(0)
      .map(a => Array(50)
        .fill(0).map(arr => Math.round(Math.random())));
    this.generationIterator = getGeneration(this.board);
  }

  ngAfterViewInit(): void {

    this.ngZone.runOutsideAngular(() => requestAnimationFrame(this.tick.bind(this)));
    const canvas = this.canvasElem.nativeElement;
    canvas.width = parseInt(canvas.offsetWidth, 10);
    canvas.height = parseInt(canvas.offsetHeight, 10);

  }


  tick(timestamp) {
    if (!this.start) {
      this.start = performance.now();
      this.fps = 0;
    }
    const progress = (performance.now() - this.start);
    if (progress > 50) {
      this.drawBoard();
      this.start = performance.now();
    }


    this.ngZone.runOutsideAngular(() =>
      requestAnimationFrame(this.tick.bind(this)));
  }

  private drawBoard() {
    const board = this.generationIterator.next().value;
    const canvas = this.canvasElem.nativeElement;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#178d1b';
    const size = Math.min(w / board.length, h / board.length);
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === 1) {
          ctx.fillStyle = '#178d1b';
          ctx.fillRect(i * (size + 5), j * (size + 5), size, size);
        } else {
          ctx.fillStyle = '#111';
          ctx.fillRect(i * (size + 5), j * (size + 5), size, size);
        }
      }
    }
  }

  onClick(event) {
    alert(event.x);
    alert(event.y);
  }
}
