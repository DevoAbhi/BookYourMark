import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { RestService } from '../rest.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  form: FormGroup
  folder_title : string;
  folders = [];
  isEditMode : boolean;
  private folderId: string;
  formDisplay : string = 'hide-form'
  constructor(
    private restService : RestService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) {}

  async ngOnInit() {

    this.form = new FormGroup({
      folder_title : new FormControl(null, [Validators.required])
    })

    await this.getFolders()

    this.route.paramMap.subscribe(async (paramMap: ParamMap) => {
      if(paramMap.has('folderId')) {
        this.isEditMode = true;
        this.folderId = paramMap.get('folderId')
        // const response = await this.restService.viewFolders();
        const editFolder = this.folders.find(folder => {
          return folder._id.toString() === this.folderId.toString()
        })


        this.form.setValue({
          folder_title : editFolder.folder_title
        })

        this.onOpenForm();
      }
      else{
        this.isEditMode = false;
        this.folderId = null;
      }
    })




  }

  async onSubmitFolder(){
    if(this.form.invalid){
      return
    }
    const folder_title = this.form.value.folder_title;


    if(!this.isEditMode){


      const response = await this.restService.createFolder(folder_title)

      if(response.success){
        this.folder_title = response.folder_title;
        this.folders.push({_id : response._id , folder_title: folder_title})
        Swal.fire(`${response.message}`)

      }

      this.form.reset();

    }
    else {
      const updateFolderResponse = await this.restService.renameFolder(this.folderId, folder_title);

      if(updateFolderResponse.success){
        const index = this.folders.findIndex(bookmark => bookmark._id.toString() === this.folderId)
        this.folders[index] = {
          _id : this.folderId,
          folder_title: folder_title
        }

        Swal.fire(`${updateFolderResponse.message}`)
      }
      else{
        console.log(updateFolderResponse.message)
      }
      this.isEditMode = false
      this.form.reset();
      this.router.navigate(['dashboard'])


    }

  }

  async getFolders(){
    const FoldersDataResponse = await this.restService.viewFolders();

    if(FoldersDataResponse.success){
      console.log(FoldersDataResponse.username);
      console.log(FoldersDataResponse.folders)
      this.folders = await FoldersDataResponse.folders

    }
  }

  async onDelete(folderId : string) {

    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this folder and all bookmarks will be deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then(async (result) => {
      if (result.value) {
        const DeleteFolderDataResponse = await this.restService.deleteFolder(folderId);

        if(DeleteFolderDataResponse.success) {
          console.log(DeleteFolderDataResponse.message)

          let idx = this.folders.findIndex(folder => folder._id === folderId)

          this.folders.splice(idx, 1)
          console.log(this.folders)
        }
        Swal.fire(
          `${DeleteFolderDataResponse.message}`,
          '✌🏻',
          'success'
        )
      // For more information about handling dismissals please visit
      // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your folder is safe 😮‍💨',
          'error'
        )
      }
    })

  }

  async onOpenForm() {
    this.formDisplay = 'display-form'
  }

  onCloseForm() {
    this.formDisplay = 'hide-form'
    if(this.isEditMode) {
      this.router.navigate(['dashboard'])
    }
  }
}


// const response = await this.restService.createFolder(folder_title)

// if(response.success){
//   console.log(response.folder_title)
//   this.folder_title = response.folder_title;
//   this.folders.push({_id : response._id , folder_title: folder_title})
//   console.log(this.folders)
// }

// this.form.reset();
