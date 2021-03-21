import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestService {


  xAuthToken = null;
  createFolderResponse = null;
  viewFolderResponse = null;
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
}
