import { HttpClient,HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router,RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { PostService } from '../../../post.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-view-remittance',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './view-remittance.component.html',
  styleUrl: './view-remittance.component.css'
})

export class ViewRemittanceComponent implements OnInit {
 @Input() remits: any;
 showDiv: boolean = false;

  constructor(
    private post: PostService,
    private route: Router,
  ){ }

//@if starts
toggleDiv() {
  this.showDiv = !this.showDiv;
}

remittanceForm = new FormGroup({
  RemAmount: new FormControl(null),
  date: new FormControl(null)
});

ngOnInit(): void {
  this.post.getremittance().subscribe((result: any) => {
    this.remits = result;
    console.log(this.remits);
  });
}

submit() {
  if (this.remittanceForm.valid) {
    this.post.submitremittance(this.remittanceForm.value).subscribe(
      (result: any) => {
        console.log(result);
        this.remittanceForm.reset();
      },
      (error) => {
        console.error('Error submitting form:', error);
      }
    );
  }
}



  remit(rid: any, amt: any, dt: any){
    this.route.navigate(["/cashiermainpage/remittedpage/remittedpage/upimgpage"]);
    console.log(rid);
    localStorage.setItem("RemitanceID", rid);
    localStorage.setItem("amount", amt);
    localStorage.setItem("date", dt);
  }
  
   
    
  }