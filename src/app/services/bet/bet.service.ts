import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Game } from './../../models/game.model';

@Injectable({
	providedIn: 'root'
})
export class BetService {
	private game = new Subject<Game>();

	startGame(game: Game) {
		this.game.next(game);
	}

	endGame(): Observable<Game> {
		return this.game.asObservable();
	}
}
