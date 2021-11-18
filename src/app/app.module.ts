import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectorComponent } from './components/selector/selector.component';
import { BetComponent } from './components/bet/bet.component';


import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
	declarations: [AppComponent, SelectorComponent, BetComponent],
	imports: [
		FormsModule,
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MatCardModule,
		MatButtonModule,
		MatIconModule,
		MatInputModule,
		MatFormFieldModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
