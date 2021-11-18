/* eslint-disable indent */
import { BetService } from './../../services/bet/bet.service';
import { Component, Input, OnInit } from '@angular/core';
import { Ball } from './../../models/ball.model';
import { Game } from './../../models/game.model';
import { SelectorService } from './../../services/selector/selector.service';

@Component({
	selector: 'app-bet',
	templateUrl: './bet.component.html',
	styleUrls: ['./bet.component.scss']
})
export class BetComponent implements OnInit {

	@Input() public  profit = 1.5;
  @Input() public  minimum = 5;
  @Input() public  ballsMaximumSelect = 8;

  public ballsSelected = Array<Ball>();
	public bet = 0;
	public total = 0;
  public contBallsSelected = 0;
  public playGame = false;

	constructor(private prepareReciveBall: SelectorService, private prepareGame: BetService) {
		this.prepareReciveBall.reciveBall().subscribe(ball => {
       this.prepareReciveBallFunction(ball);
		});
	}

  ngOnInit(): void {
    // Init print balls empty
		this.ballsSelected = Array.from(
      {length: this.ballsMaximumSelect}, () => new Ball({value: null, color: 'grey'}
    ));
    this.contBallsSelected = 0;
	}

	calculateProfit(){
    this.bet = Number(this.bet.toFixed(2));
		this.total = Number((this.bet*this.contBallsSelected).toFixed(2));
	}

  prepareReciveBallFunction( ball: Ball) {
    const { value } = ball;
    try {
      if (value === null ) {
        this.ngOnInit();
      }
      else if (this.contBallsSelected < this.ballsMaximumSelect && !this.ballsSelected.includes(ball)) {
        this.ballsSelected.splice(this.contBallsSelected, 1, ball);
        this.contBallsSelected += 1;
      }
      this.calculateProfit();
     } catch(error) {
      throw Error(`Error in the component bet: ${error}`);
     }
  }

	startGame() {
    const totalBet = Number((this.total*this.profit).toFixed(2));
		this.prepareGame.startGame(new Game({balls: this.ballsSelected , total: totalBet}));
    this.playGame = true;
	}

}
