export class Ball {
	public value: number | null;
	public color: string | null;

	constructor(ball: Ball) {
		this.value = ball.value || null;
		this.color = ball.color || null;
	}
}
