import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  form: FormGroup
  constructor(private restService : RestService) {}

  ngOnInit(): void {

    this.form = new FormGroup({
      'folder_title' : new FormControl(null, [Validators.required])
    })
  }

  async onCreateFolder(){
    if(this.form.invalid){
      return
    }
    const folder_title = this.form.value.folder_title;

    const response = await this.restService.createFolder(folder_title)

    if(response.success){
      console.log(response.folder_title)
    }
  }
}
