import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { appRoutes } from './app.routes';  // Import your routes

@NgModule({
  declarations: [
    // Remove all standalone components here
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  bootstrap: [] // Remove AppComponent bootstrap from here if AppComponent is standalone
})
export class AppModule { }
