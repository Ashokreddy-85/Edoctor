import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { HeaderComponent} from '../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { AuthService } from '../../../../services/auth.service';
@Component({
  selector: 'app-create-appointment',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,HeaderComponent,FooterComponent],
  templateUrl: './create-appointment.component.html',
  styleUrl: './create-appointment.component.css'
})
export class CreateAppointmentComponent {
  form: FormGroup = new FormGroup({
    
    age: new FormControl(''),
    Problem: new FormControl(''),
    Date: new FormControl(''),
    Time: new FormControl(''),
    
  });
  submitted = false;
  doctorID:any;
  doctorOnfo:any=[];
  userInFo:any=[];
  constructor(private formBuilder: FormBuilder,private activatedRoute: ActivatedRoute,private _router : Router,private authservice: AuthService) {
    this.userInFo=localStorage.getItem('session');
    this.userInFo=JSON.parse(this.userInFo);
    if(this.activatedRoute.snapshot.paramMap.get('id')){
      this.doctorID=this.activatedRoute.snapshot.paramMap.get('id');
      this.authservice.getDoctorInfo(this.doctorID).subscribe(data=>{
        console.log("response :",data.body);
        console.log("status code:",data.status);
        this.doctorOnfo=data.body;
      }, (error)=>{
        console.log(error);
        alert("Doctor Already exist ");
      })
    }
   }
  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        age:['',Validators.required],
        Problem: ['',Validators.required],
        Date:['',Validators.required],
        Time: ['', Validators.required]
        
      }
      
    );
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  onSubmit(){
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    console.log(JSON.stringify(this.form.value, null, 2));
    const {Problem,Date} = this.form.value;
    this.authservice.bookSlots(Date,"Booked",Problem,this.doctorID,this.userInFo.userId ).subscribe(data=>{
      console.log("response :",data.body);
      console.log("status code:",data.status);
      if(data.status == 200 || data.status == 201){
        alert('Appointment booked successfully');
        
        this._router.navigate(['/mybookings',this.userInFo.userId]);
      } else{
        alert("Something went wrong");
      }
    }, (error)=>{
      console.log(error);
      alert("Something went wrong");
    })
  }
}
