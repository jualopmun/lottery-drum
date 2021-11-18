import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ball } from 'src/app/models/ball.model';
import { Game } from 'src/app/models/game.model';

import { SelectorComponent } from './selector.component';

describe('SelectorComponent', () => {
	let component: SelectorComponent;
	let fixture: ComponentFixture<SelectorComponent>;
	const numberBallsGenerate = 10;
	const colorsBalls = ['red', 'deeppink' , 'green', 'blue'];
	const ballsSend = Array.from({length: 3}, (_, i) => new Ball(
		{ value: i + 1, color: colorsBalls[Math.floor(Math.random() * colorsBalls.length)] }
	));
	const totalBet = 75;
	const profit = 1.5;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SelectorComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(SelectorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('Should create', () => {
		expect(component).toBeTruthy();
	});

	it('Generate balls random', () => {
		const fixture = TestBed.createComponent(SelectorComponent);
		const  app = fixture.componentInstance;
		app.numberBalls = numberBallsGenerate;
		fixture.detectChanges();
		const compiled = fixture.nativeElement as HTMLElement;
		// 1.1 - Numbers balls check generate
		expect(app.numberBalls).toEqual(app.balls.length);
		// 1.2 Print balls html
		// 1.2.1 - Render balls in html
		const getElementBall: (index: number) => string | any = function (index) {
			return compiled.querySelector<HTMLElement>(`.ball-number-${index}`);
		};
		app.balls.forEach((_, i) => expect(getElementBall(i)?.textContent).toContain(i + 1));
		// 1.2.2 - Render colors
		app.balls.forEach((_, i) => expect(colorsBalls.includes(getElementBall(i)?.style?.backgroundColor)).toBeTruthy());
	});

	it('Check final result', ()  => {
		const fixture = TestBed.createComponent(SelectorComponent);
		const app = fixture.componentInstance;
		const compiled = fixture.nativeElement as HTMLElement;
		// 3.2 - Render disabled html
		app.finalResult.active = false;
		fixture.detectChanges();
		expect(compiled.querySelector<HTMLElement>('.title-selector')?.textContent).toContain('Numbers');
		expect(compiled.querySelector<HTMLElement>('.clear-selector')).toBeTruthy();
		// 3.2 - Render active html
		app.finalResult.active = true;
		fixture.detectChanges();
		expect(compiled.querySelector<HTMLElement>('.title-selector')?.textContent).toContain('Result');
		expect(compiled.querySelector<HTMLElement>('.final-result')).toBeTruthy();
	});

	it('Check end game', ()  => {
		const fixture = TestBed.createComponent(SelectorComponent);
		const app = fixture.componentInstance;
		fixture.detectChanges();
		const compiled = fixture.nativeElement as HTMLElement;
		const totalWinsSend = totalBet*profit;
		app.prepareEndGameFunction(new Game({balls: ballsSend, total: totalWinsSend}));
		// 1 - Number ball winner
		expect(app.balls.length).toEqual(1);
		// 1.2 - Render ball winner remnder in html
		fixture.detectChanges();
		// 2.1 - Total winner
		expect(app.totalWins).toEqual(totalWinsSend);
		// 2.2 - Render total winner render in html
		expect(compiled.querySelector<HTMLElement>('.final-result')?.textContent).toContain(totalWinsSend);
	});

});
