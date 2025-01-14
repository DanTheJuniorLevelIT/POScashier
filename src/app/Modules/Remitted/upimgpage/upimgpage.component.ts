import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { PostService } from '../../../post.service';

@Component({
  selector: 'app-upimgpage',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './upimgpage.component.html',
  styleUrl: './upimgpage.component.css'
})
export class UpimgpageComponent implements OnInit {
  constructor(
    private route: Router,
    private http: HttpClient,
    private post: PostService,
  ) { }

  PictureForm = new FormGroup({});
  rid: any;
  amt: any;
  dt: any;
  filename: any;
  selectedFile: any;
  images: any;
  RemitanceID: any;
  remID: any;
  progress: any;
  remits: any;

  remit = {
    RemitanceID: localStorage.getItem("RemitanceID"),
    remImg: localStorage.getItem("remImg")
  };

  ngOnInit(): void {
    this.onPost();
    this.rid = localStorage.getItem('RemitanceID');
    this.amt = localStorage.getItem('amount');
    this.dt = localStorage.getItem('date');
    // const RID = localStorage.getItem('RemitanceID');
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.filename = this.selectedFile.name;
    // console.log(this.rid);
  }

  onPost() {
    const fd = new FormData();
    const RID = localStorage.getItem('RemitanceID');
    if (this.selectedFile) {
      fd.append('files', this.selectedFile);
      fd.append('RemitanceID', this.rid);
      console.log(RID);
      this.http.post('http://localhost/nlahPOS2/uploadimg.php', fd, {
        observe: 'events',
        reportProgress: true
      }).subscribe((event:any) =>{
        this.post.getremittance().subscribe((result: any) => {
          this.remits = result;
          console.log(this.remits);
        });
        console.log(event);
      });
      this.route.navigate(['/cashiermainpage/remittedpage/remittedpage/viewremit'])
    }
  }
}
