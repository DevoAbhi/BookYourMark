import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit {

  form : FormGroup
  folder_id : string;

  constructor(private restService : RestService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      'bookmark_title': new FormControl(null, {validators: [Validators.required]}),
      'href': new FormControl(null, {validators: [Validators.required]}),
      'description': new FormControl(null, {validators: [Validators.required]})
    })

    this.route.paramMap.subscribe((paramMap : ParamMap) => {
      this.folder_id = paramMap.get('folderId')
    })
  }

  async onSubmitBookmark() {
    if(this.form.invalid){
      return;
    }

    this.restService.createBookmarkReqObj = {}
    this.restService.createBookmarkReqObj.bookmark_title = this.form.value.bookmark_title;
    this.restService.createBookmarkReqObj.href = this.form.value.href;
    this.restService.createBookmarkReqObj.description = this.form.value.description;
    this.restService.createBookmarkReqObj.folder_id = this.folder_id

    const response = await this.restService.createBookmark();

    if(response.success) {
      console.log(response.message);
    }

    this.form.reset();

  }
}
