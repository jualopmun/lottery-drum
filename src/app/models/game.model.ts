import { Ball } from './../models/ball.model';

export class Game {
	public balls: Array<Ball> | null = [];
	public total: number | null;

	constructor(game: Game) {
		this.balls = game.balls || null;
		this.total = game.total || null;
	}
}
