import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackupService {
  resource = 'backup';
  constructor(private http: HttpClient) { }


  getLast() {
    return this.http.get(this.resource + '/last');
  }

  executeBackup() {
    return this.http.post(this.resource, {});
  }

  getConfig() {
    return this.http.get(this.resource + '/getconfig');
  }

  alterConfig(config: any) {
    return this.http.put(this.resource + '/alterconfig', config);
  }

  getDirBackup() {
    return this.http.get(this.resource + '/dirbackup');
  }


}
