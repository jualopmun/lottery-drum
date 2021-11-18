import { TestBed } from '@angular/core/testing';

import { BetService } from './bet.service';
import { Game } from '../../models/game.model';
import { Ball } from 'src/app/models/ball.model';

describe('BetService', () => {
	let service: BetService;
	const ballsSend = Array.from({ length: 3 }, (_, i) => new Ball(
		{value: i + 1, color: 'yellow'}
	));
	const gameSend= new Game({ balls: ballsSend, total: 70 });

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(BetService);
	});

	it('Should be created', () => {
		expect(service).toBeTruthy();
	});

	it('Check startGame and endGame', () => {
		// 1 - Init start game
		const sendBallService = service.startGame(gameSend);
		expect(sendBallService).not.toBeNull();
		// 2 - Prepare end game
		service.endGame().subscribe(game => {
			expect(game).toEqual(gameSend);
		});
	});
});
