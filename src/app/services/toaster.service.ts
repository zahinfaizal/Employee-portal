import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private toastr: ToastrService) { }
  showSuccess(msg:any) {
    this.toastr.success(msg,'Success');
  }
  showError(msg:any) {
    this.toastr.error(msg,'Error');
  }
  showWarning(msg:any) {
    this.toastr.info(msg,'Warning');
  }
  
}
