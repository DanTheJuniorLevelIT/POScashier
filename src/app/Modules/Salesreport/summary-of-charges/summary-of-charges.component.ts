
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-summary-of-charges',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './summary-of-charges.component.html',
  styleUrl: './summary-of-charges.component.css'
})
export class SummaryOfChargesComponent {

}
