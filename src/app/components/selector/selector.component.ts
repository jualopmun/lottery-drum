/* eslint-disable indent */
import { Component, Input, OnInit } from '@angular/core';
import { SelectorService } from './../../services/selector/selector.service';
import { Ball } from './../../models/ball.model';
import { BetService } from './../../services/bet/bet.service';
import { Game } from 'src/app/models/game.model';

// Format messages
const messageEndGame = {
  default: {
    message: '',
    color:'',
    active: false
  },
  win: {
    message:'YOU WON',
    color: 'limegreen',
    active: true,
  },
  lose: {
    message: 'YOU LOST',
    color: 'red',
    active: true,
  }
};
@Component({
	selector: 'app-selector',
	templateUrl: './selector.component.html',
	styleUrls: ['./selector.component.scss']
})
export class SelectorComponent implements OnInit {
  @Input() public  numberBalls = 10;
  @Input() public  colors = [ 'red', 'deeppink' , 'green', 'blue' ];

  public finalResult = messageEndGame.default;
	public balls = Array<Ball>();
  public totalWins = 0;

	constructor( private prepareSendBall: SelectorService, private prepareEndGame: BetService ) {
    this.prepareEndGame.endGame().subscribe(gameRecived => {
      this.prepareEndGameFunction(gameRecived);
    });
	}

	ngOnInit(): void {
    // Init balls print render
		this.balls = Array.from(
      {length: this.numberBalls}, (_, i) => new Ball(
        { value: i + 1, color: this.colors[Math.floor(Math.random() * this.colors.length)] }
      ));
	}

	selectionBall(ball: Ball){
		this.prepareSendBall.sendBall(ball);
	}

  clearSelection(){
		this.prepareSendBall.clearBallsSelection();
	}

  prepareEndGameFunction( gameRecived: Game) {
    const { balls , total } = gameRecived;
    if (balls && total) {
      const randomIndex = Math.floor(Math.random() * this.balls.length);
      const ballSelect = this.balls[randomIndex];

      if (balls.includes(ballSelect)) {
        this.finalResult = messageEndGame.win;
      } else {
        this.finalResult = messageEndGame.lose;
      }
      this.totalWins = total;
      this.balls = [this.balls[randomIndex]];
    } else {
      throw Error(`Ball is not recived success in selector component: ${gameRecived}`);
    }
  }
}
