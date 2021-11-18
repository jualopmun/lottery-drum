import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Ball } from './../../models/ball.model';


@Injectable({
	providedIn: 'root'
})
export class SelectorService {
	private ballSend = new Subject<Ball>();

	sendBall(ball: Ball) {
		this.ballSend.next(ball);
	}

	reciveBall(): Observable<Ball> {
		return this.ballSend.asObservable();
	}

	clearBallsSelection() {
		this.ballSend.next(new Ball({value: null, color: null}));
	}


}
