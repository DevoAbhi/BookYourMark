import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { RestService } from '../rest.service';
import Swal from 'sweetalert2';

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
    private location: Location,
    private router: Router) { }

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
        Swal.fire(`${response.message}`)
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
        Swal.fire(`${response.message}`)
      }
      else {
        console.log(response.message)
      }

      this.form.reset();
      this.isEditMode = false;
      this.router.navigate([`folder/${this.folder_id}`])


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

  async onDelete(bookmark_id : string) {

    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this bookmark!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then(async (result) => {
      if (result.value) {
        const response = await this.restService.deleteBookmark(bookmark_id);

        if(response.success) {
          console.log(response.message)
          const index = this.bookmarks.findIndex(bookmark => bookmark._id.toString() === bookmark_id.toString());
          this.bookmarks.splice(index,1);
        }
        Swal.fire(
          `${response.message}`,
          '✌🏻',
          'success'
        )
      // For more information about handling dismissals please visit
      // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your bookmark is safe 😮‍💨',
          'error'
        )
      }
    })



    // const response = await this.restService.deleteBookmark(bookmark_id);

    // if(response.success) {
    //   console.log(response.message)
    //   const index = this.bookmarks.findIndex(bookmark => bookmark._id.toString() === bookmark_id.toString());
    //   this.bookmarks.splice(index,1);
    // }
  }
}
