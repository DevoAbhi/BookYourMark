import { Location } from '@angular/common';
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
  bookmark_id: string;
  bookmarks = []
  formDisplay : string = 'hide-form'
  isEditMode: boolean;

  constructor(
    private restService : RestService,
    private route: ActivatedRoute,
    private location: Location) { }

  async ngOnInit() {



    this.form = new FormGroup({
      'bookmark_title': new FormControl(null, {validators: [Validators.required]}),
      'href': new FormControl(null, {validators: [Validators.required]}),
      'description': new FormControl(null, {validators: [Validators.required]})
    })

    this.route.paramMap.subscribe(async (paramMap : ParamMap) => {
      this.folder_id = paramMap.get('folderId')
      await this.getBookmarks();
      if(paramMap.has('bookmarkId')) {
        this.isEditMode = true;
        this.bookmark_id = paramMap.get('bookmarkId');

        const editBookmark = this.bookmarks.find(bookmark => {
          return bookmark._id.toString() === this.bookmark_id.toString()
        })

        this.form.setValue({
          bookmark_title: editBookmark.bookmark_title,
          href: editBookmark.href,
          description : editBookmark.description
        })

        this.onOpenForm()
      }
      else{
        this.isEditMode = false;
        this.bookmark_id = null;
      }
    })


  }

  async onSubmitBookmark() {
    if(this.form.invalid){
      return;
    }

    if(!this.isEditMode){
      this.restService.createBookmarkReqObj = {}
      this.restService.createBookmarkReqObj.bookmark_title = this.form.value.bookmark_title;
      this.restService.createBookmarkReqObj.href = this.form.value.href;
      this.restService.createBookmarkReqObj.description = this.form.value.description;
      this.restService.createBookmarkReqObj.folder_id = this.folder_id

      const response = await this.restService.createBookmark();

      if(response.success) {
        console.log(response.message);

        this.bookmarks.push(response.bookmark)
      }

      this.form.reset();
    }
    else{
      this.restService.createBookmarkReqObj = {}
      this.restService.createBookmarkReqObj.bookmark_title = this.form.value.bookmark_title;
      this.restService.createBookmarkReqObj.href = this.form.value.href;
      this.restService.createBookmarkReqObj.description = this.form.value.description;
      this.restService.createBookmarkReqObj.bookmark_id = this.bookmark_id

      const response = await this.restService.updateBookmark();

      if(response.success){
        console.log(response.message);
        const index = this.bookmarks.findIndex(bookmark => bookmark._id.toString() === this.bookmark_id)
        this.bookmarks[index] = this.restService.createBookmarkReqObj
      }
      else {
        console.log(response.message)
      }

      this.form.reset();
      this.isEditMode = false;
      this.location.back();


    }



  }

  async getBookmarks() {

    const response = await this.restService.viewBookmarks(this.folder_id);

    if(response.success) {
      console.log(response.message)
      console.log(response.bookmarks)
    }
    this.bookmarks = response.bookmarks;
    console.log(this.bookmarks)
  }

  onOpenForm() {
    this.formDisplay = 'display-form'
  }

  onCloseForm() {
    this.formDisplay = 'hide-form'
  }
}
