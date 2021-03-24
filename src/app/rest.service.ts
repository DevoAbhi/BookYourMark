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
  createBookmarkReqObj;
  createBookmarkResponse;
  viewBookmarkResponse;
  updatedBookmarkResponse;
  deleteBookmarkResponse;


  constructor(private http: HttpClient) { }


  // ************************************  Folder APIs ************************************************
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



  // *********************************** Bookmark APIs ********************************************

  async createBookmark() {

    this.xAuthToken = localStorage.getItem('token')

    await this.http.post('http://localhost:3000/create-bookmark', this.createBookmarkReqObj, {
      headers: new HttpHeaders({
        'X-AUTH-TOKEN' : this.xAuthToken
      })
    }).toPromise()
      .then(response => {
        this.createBookmarkResponse = response
      })

    return this.createBookmarkResponse;
  }

  async viewBookmarks(folder_id: string) {

    this.xAuthToken = localStorage.getItem('token');

    await this.http.get(`http://localhost:3000/view-bookmarks?folder_id=${folder_id}`, {
      headers: new HttpHeaders({
        'X-AUTH-TOKEN' : this.xAuthToken
      })
    }).toPromise()
    .then(response => {
      this.viewBookmarkResponse = response
    })

    return this.viewBookmarkResponse;
  }

  async updateBookmark() {
    this.xAuthToken = localStorage.getItem('token');

    await this.http.put('http://localhost:3000/update-bookmark', this.createBookmarkReqObj, {
      headers: new HttpHeaders({
        'X-AUTH-TOKEN' : this.xAuthToken
      })
    }).toPromise()
      .then(response => {
        this.updatedBookmarkResponse = response
      })

      return this.updatedBookmarkResponse;
  }

  async deleteBookmark(bookmark_id: string) {

    this.xAuthToken = localStorage.getItem('token');

    await this.http.delete(`http://localhost:3000/delete-bookmark?bookmark_id=${bookmark_id}`, {
      headers: new HttpHeaders({
        'X-AUTH-TOKEN' : this.xAuthToken
      })
    }).toPromise()
      .then(response => {
        this.deleteBookmarkResponse = response;
      })

      return this.deleteBookmarkResponse;
  }
}
