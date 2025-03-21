import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from "./Components/dashboard/dashboard.component";
import { BodyComponent } from "./Components/body/body.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BodyComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Semicolons2025';

}
