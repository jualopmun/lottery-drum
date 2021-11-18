import { TestBed } from '@angular/core/testing';
import { Ball } from 'src/app/models/ball.model';

import { SelectorService } from './selector.service';

describe('SelectorService', () => {
	let service: SelectorService;
	const ballSelect = new Ball({value: 1, color: 'yellow'});

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(SelectorService);
	});

	it('Should be created', () => {
		expect(service).toBeTruthy();
	});

	it('Check sendBall and recivedBall', () => {
		// 1 - Init send ball
		const sendBallService = service.sendBall(ballSelect);
		expect(sendBallService).not.toBeNull();
		// 2 - Prepare recived ball
		service.reciveBall().subscribe(ball => {
			expect(ball).toEqual(ballSelect);
		});
	});

	it('Check clearBallSelection', () => {
		// 1 - Init clear ball selection
		const sendBallService = service.clearBallsSelection();
		expect(sendBallService).not.toBeNull();
		// 2 - Prepare recived ball
		service.reciveBall().subscribe(ball => {
			expect(ball).toEqual({value: null, color: null});
		});
	});

});
