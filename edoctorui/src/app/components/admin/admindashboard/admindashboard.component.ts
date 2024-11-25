import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { HeaderComponent } from "../../admin/header/header.component";
import { FooterComponent } from '../../footer/footer.component';
@Component({
  selector: 'app-admindashboard',
  standalone: true,
  imports: [HeaderComponent,FooterComponent],
  templateUrl: './admindashboard.component.html',
  styleUrl: './admindashboard.component.css',
})
export class AdmindashboardComponent {
  public userdata:any=[];
  constructor(private activatedRoute: ActivatedRoute,private _router : Router,private authService: AuthService){
    this.userdata=localStorage.getItem("session");
    // console.log(this.userdata);
    this.userdata=JSON.parse(this.userdata) }
    update(){
      this._router.navigate(['/adminupdate']);
    }
  navigate(){
    this._router.navigate(['/appointmentlist']);
  }
   logout(){
    this.authService.logout();
  }
  navigateToDoc(){
    this._router.navigate(['/doc-register'])
    }
   }