import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestService {


  xAuthToken = null;
  createFolderResponse = null;
  viewFolderResponse = null;
  RenameFolderResponse = null;
  DeleteFolderResponse = null;
  constructor(private http: HttpClient) { }

  async createFolder(folder_title: string){

    this.xAuthToken = localStorage.getItem('token');
    const folder = {
      folder_title: folder_title
    }
    await this.http.post('http://localhost:3000/create-folder', folder, {
      headers: new HttpHeaders({
        'X-AUTH-TOKEN' : this.xAuthToken
      })
    }).toPromise()
      .then(response => {
        this.createFolderResponse = response;
      })

      return this.createFolderResponse;
  }

  async viewFolders(){
    this.xAuthToken = localStorage.getItem('token');

    await this.http.get('http://localhost:3000/view-folders', {
      headers: new HttpHeaders({
        'X-AUTH-TOKEN' : this.xAuthToken
      })
    }).toPromise()
      .then(response => {
        this.viewFolderResponse = response;
      })

      return this.viewFolderResponse;
  }

  async renameFolder(folderId : string, folder_title: string) {
    this.xAuthToken = localStorage.getItem('token');

    const updatedFolder = {
      folder_title: folder_title,
      folderId: folderId
    }

    await this.http.post('http://localhost:3000/rename-folder', updatedFolder, {
      headers: new HttpHeaders({
        'X-AUTH-TOKEN' : this.xAuthToken
      })
    }).toPromise()
      .then(response => {
        this.RenameFolderResponse = response;
      })

      return this.RenameFolderResponse;

  }

  async deleteFolder(folder_id){
    this.xAuthToken = localStorage.getItem('token');

    await this.http.delete(`http://localhost:3000/delete-folder?folder_id=${folder_id}`, {
      headers: new HttpHeaders({
        'X-AUTH-TOKEN' : this.xAuthToken
      })
    }).toPromise()
      .then(response => {
        this.DeleteFolderResponse = response;
      })

      return this.DeleteFolderResponse
  }
}
