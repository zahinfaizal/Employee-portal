import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AdminApiService } from '../services/admin-api.service';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-update-admin',
  templateUrl: './update-admin.component.html',
  styleUrls: ['./update-admin.component.css']
})
export class UpdateAdminComponent implements OnInit{

  profileImage:string = "./assets/images/profile-img.png"
  editAdminStatus:boolean = false
  adminDetails:any ={}
  @Output() onAdminChange = new EventEmitter()

  constructor(private api:AdminApiService,private toaster:ToasterService){}

  ngOnInit(): void {
    // get admin details
    this.api.authenticate().subscribe((res:any)=>{
      this.adminDetails = res
      if(res.picture){
        this.profileImage = res.picture
      }
    })
  }


  editAdminBtnClick(){
    this.editAdminStatus = true
  }
  getFile(event:any){
    let file = event.target.file[0]
    //  console.log(file);
    let fr = new FileReader()
    fr.readAsDataURL(file)
    fr.onload = (event:any)=>{
      console.log(event.target.result);
      this.profileImage = event.target.result
      this.adminDetails.picture = this.profileImage
      
    }
    
  }

  updateAdmin(){
    this.api.updateAdmin(this.adminDetails).subscribe({
      next:(res:any)=>{
        this.toaster.showSuccess("Admin details updated successfully")
        // save admin details
        localStorage.setItem("admin_name",res.name)
        localStorage.setItem("admin_pswd",res.password)
        this.editAdminStatus = false
        this.onAdminChange.emit(res.name)

      },
      error:(err:any)=>{
        this.toaster.showError("Updation failed!!! please try again after sometime")
      }
    })
  }
  cancel(){
    this.editAdminStatus =false
  }

}
