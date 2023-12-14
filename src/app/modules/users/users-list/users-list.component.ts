import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../user-api.service';
import { userModel } from '../user.model';
import jspdf from 'jspdf'
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit{

  p:number = 1
  searchKey:string=""
  allUsers:userModel[]=[]
  constructor(private api:UserApiService){}
  ngOnInit(): void {
    this.getallUser()
  }

  getallUser(){
    this.api.getAllUserAPI().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.allUsers=res
      },
      error:(err:any)=>{
        alert(err.message)
      }
    })
  }

  removeUser(id:any){
    this.api.deleteUserAPI(id).subscribe({
      next:(res:any)=>{
        // console.log(res);
        alert("User Remove Succesfully")
        this.getallUser()
      },
      error:(err:any)=>{
        alert(err.message)
      }
    })
  }

  sortById(){
    this.allUsers.sort((a:any,b:any)=>a.id-b.id)
  }

  sortByName(){
    this.allUsers.sort((a:any,b:any)=>a.name.localeCompare(b.name))
  }

  generatePDF(){
    let pdf = new jspdf()
    let head = [['Id','Username','Email','Status']]
    let body:any=[]
    this.allUsers.forEach((item:any)=>{
      if(item.id != "1"){
        body.push([item.id,item.name,item.email,item.active==1?'Active':'Inactive'])
      }
    })
    pdf.setFontSize(16)
    pdf.text('All User List',10,10)
    autoTable(pdf,{head,body})
    pdf.output('dataurlnewwindow')
    pdf.save('alluserlist.pdf')
  }
}

