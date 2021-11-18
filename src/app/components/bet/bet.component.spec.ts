import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Ball } from 'src/app/models/ball.model';

import { BetComponent } from './bet.component';

describe('BetComponent', () => {
	let component: BetComponent;
	let fixture: ComponentFixture<BetComponent>;

	const colorsBalls = ['red', 'deeppink' , 'green', 'blue'];
	const ballsRecived = Array.from({length: 3}, (_, i) => new Ball(
		{value: i + 1, color: colorsBalls[Math.floor(Math.random() * colorsBalls.length)]}
	));
	const minimumBet = 5;
	const total = 70;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [FormsModule],
			declarations: [BetComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(BetComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('Should create', () => {
		expect(component).toBeTruthy();
	});

	it('Initial component', () => {
		const fixture = TestBed.createComponent(BetComponent);
		const  app = fixture.componentInstance;
		fixture.detectChanges();
		const compiled = fixture.nativeElement as HTMLElement;
		// 1 - Print balls empty html
		const getElementBall: (index: number) => string | any = function (index) {
			return compiled.querySelector<HTMLElement>(`.ball-select-${index}`);
		};
		app.ballsSelected.forEach((_, i) => expect((getElementBall(i)?.style?.backgroundColor)).toEqual('grey'));
		// 2 - Print message warning
		expect(compiled.querySelector<HTMLElement>('.warning-minimum')).toBeTruthy();
		// 3 - Check button disabled
		const addButton = fixture.debugElement.query(By.css('.button-start-game'));
		const isDisabled = (addButton.nativeElement.getAttribute('disabled') === '' );
		expect(isDisabled).toBeTruthy();
	});

	it('Check button', () => {
		const fixture = TestBed.createComponent(BetComponent);
		const  app = fixture.componentInstance;
		fixture.detectChanges();
		const addButton = fixture.debugElement.query(By.css('.button-start-game'));
		const isDisabled = (addButton.nativeElement.getAttribute('disabled') === '' );

		// 1.2 - Check bet < minimum bet
		const bets = Array.from({length: minimumBet}, (_, i) => i);
		bets.forEach((bet) =>{
			app.bet = bet;
			fixture.detectChanges();
			expect(isDisabled).toBeTruthy();
		});
	});

	it('Check balls selected', () => {
		const fixture = TestBed.createComponent(BetComponent);
		const  app = fixture.componentInstance;
		fixture.detectChanges();
		const compiled = fixture.nativeElement as HTMLElement;
		ballsRecived.forEach((ball) => app.prepareReciveBallFunction(ball));
		fixture.detectChanges();

		// 1 - Check balls selected
		ballsRecived.forEach((ball) => expect(app.ballsSelected.includes(ball)).toBeTruthy());
		// 1.2 Check render in html
		const getElementBall: (index: number) => string | any = function (index) {
			return compiled.querySelector<HTMLElement>(`.ball-select-${index}`);
		};
		ballsRecived.forEach((_, i) => {
			expect(colorsBalls.includes(getElementBall(i)?.style?.backgroundColor)).toBeTruthy();
			expect(getElementBall(i)?.textContent).toContain(ballsRecived[i].value);
		});

	});

	it('Check start Game', () => {
		const fixture = TestBed.createComponent(BetComponent);
		const  app = fixture.componentInstance;
		app.ballsSelected = ballsRecived;
		app.total = total;
		app.startGame();
		fixture.detectChanges();
		// 1 - Check button
		const addButton = fixture.debugElement.query(By.css('.button-start-game'));
		const isDisabled = (addButton.nativeElement.getAttribute('disabled') === '' );
		expect(isDisabled).toBeTruthy();
	});

});
