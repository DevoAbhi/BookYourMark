import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit {

  form : FormGroup

  constructor(private restService : RestService) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      'bookmark_title': new FormControl(null, {validators: [Validators.required]}),
      'href': new FormControl(null, {validators: [Validators.required]}),
      'description': new FormControl(null, {validators: [Validators.required]})
    })
  }

  onSubmitBookmark() {
    if(this.form.invalid){
      return;
    }

    this.restService.createBookmarkReqObj = {}
    this.restService.createBookmarkReqObj.bookmark_title = this.form.value.bookmark_title;
    this.restService.createBookmarkReqObj.href = this.form.value.href;
    this.restService.createBookmarkReqObj.description = this.form.value.description;

    this.form.reset();

  }
}
