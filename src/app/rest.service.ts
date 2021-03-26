import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../environments/environment";

const BACKEND_URL_FOLDER = environment.apiURL + '/folder';
const BACKEND_URL_BOOKMARK = environment.apiURL + '/bookmark';

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
    await this.http.post(BACKEND_URL_FOLDER +'/create-folder', folder, {
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

    await this.http.get(BACKEND_URL_FOLDER +'/view-folders', {
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

    await this.http.post(BACKEND_URL_FOLDER +'/rename-folder', updatedFolder, {
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

    await this.http.delete(BACKEND_URL_FOLDER +`/delete-folder?folder_id=${folder_id}`, {
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

    await this.http.post(BACKEND_URL_BOOKMARK +'/create-bookmark', this.createBookmarkReqObj, {
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

    await this.http.get(BACKEND_URL_BOOKMARK +`/view-bookmarks?folder_id=${folder_id}`, {
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

    await this.http.put(BACKEND_URL_BOOKMARK +'/update-bookmark', this.createBookmarkReqObj, {
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

    await this.http.delete(BACKEND_URL_BOOKMARK +`/delete-bookmark?bookmark_id=${bookmark_id}`, {
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
