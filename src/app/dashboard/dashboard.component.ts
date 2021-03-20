import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  form: FormGroup
  constructor() {}

  ngOnInit(): void {

    this.form = new FormGroup({
      'folder_title' : new FormControl(null, [Validators.required])
    })
  }

  onCreateFolder(){
    if(this.form.invalid){
      return
    }
    const folder_title = this.form.value.folder_title;
  }
}
