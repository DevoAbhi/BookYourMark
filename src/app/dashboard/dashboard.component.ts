import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { RestService } from '../rest.service';

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
  private folderData = new Subject<Object>();
  constructor(private restService : RestService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {

    this.form = new FormGroup({
      folder_title : new FormControl(null, [Validators.required])
    })

    this.route.paramMap.subscribe(async (paramMap: ParamMap) => {
      if(paramMap.has('folderId')) {
        this.isEditMode = true;
        this.folderId = paramMap.get('folderId')
        const response = await this.restService.viewFolders();
        const editFolder = response.folders.find(folder => {
          return folder._id === this.folderId
        })

        this.form.setValue({
          folder_title : editFolder.folder_title
        })
      }
      else{
        this.isEditMode = false;
        this.folderId = null;
      }
    })



    this.getFolders()
  }

  async onSubmitFolder(){
    if(this.form.invalid){
      return
    }
    const folder_title = this.form.value.folder_title;

    if(!this.isEditMode){
      const response = await this.restService.createFolder(folder_title)

      if(response.success){
        console.log(response.folder_title)
        this.folder_title = response.folder_title;
        this.folders.push({_id : response._id , folder_title: folder_title})
        console.log(this.folders)
      }
    }
    else {
      const updateFolderResponse = await this.restService.renameFolder(this.folderId, folder_title);

      if(updateFolderResponse.success){
        console.log(updateFolderResponse.message)
        this.folders.push({_id : this.folderId , folder_title: folder_title})
      }
      else{
        console.log(updateFolderResponse.message)
      }
    }

  }

  async getFolders(){
    const FoldersDataResponse = await this.restService.viewFolders();

    if(FoldersDataResponse.success){
      console.log(FoldersDataResponse.username);
      console.log(FoldersDataResponse.folders)
      this.folders = FoldersDataResponse.folders

    }
  }

  async onDelete(folderId : string) {
    const DeleteFolderDataResponse = await this.restService.deleteFolder(folderId);

    if(DeleteFolderDataResponse.success) {
      console.log(DeleteFolderDataResponse.message)

      let idx = this.folders.findIndex(folder => folder._id === folderId)

      this.folders.splice(idx, 1)
      console.log(this.folders)
    }
  }

  async onOpen(folderId : string) {
    
  }
}
