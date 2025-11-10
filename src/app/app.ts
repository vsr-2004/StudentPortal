import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],   // Import RouterModule to use router-outlet
  templateUrl: './app.html',
})
export class AppComponent { }
