
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule,FormGroup,FormControl } from '@angular/forms';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { PostService } from '../post.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-loginpage',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, RouterLink, RouterLinkActive,CommonModule],
  templateUrl: './loginpage.component.html',
  styleUrl: './loginpage.component.css'
})
export class LoginpageComponent implements OnInit {
  log:any;
  loginForm = new FormGroup({
    use: new FormControl(null),
    pas: new FormControl(null)
})
showDiv: boolean = false;
ngOnInit(): void{

}
  constructor(
    private conn:PostService,
    private route:Router
  ){ }

  loginFunct(){
    console.log(this.loginForm.value);
    this.conn.login(this.loginForm.value).subscribe((result:any)=>{
      this.log = result;
      console.log(this.log);
      if(result){
        console.log("Login Successful");
        this.route.navigate(['cashiermainpage'])
      }
      else{
          this.showDiv = !this.showDiv;
      }
    })
  }
 }
