
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-remittedpage',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './remittedpage.component.html',
  styleUrl: './remittedpage.component.css'
})
export class RemittedpageComponent {

}
