import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgentService {


  private keyConfigUrl = 'icre.agent.config.url';
  private keyConfigPort = 'icre.agent.config.port';
  private keyPrinterName = 'icre.printer.name';
  private keyDocModelsDir = 'icre.models.dir';

  constructor(private http: HttpClient) { }

  saveConfig(address: string, port: number) {
    localStorage.setItem(this.keyConfigPort, port.toString());
    localStorage.setItem(this.keyConfigUrl, address);
  }
  getConfig(): { port: number, url: string } {
    const port: number = parseInt(localStorage.getItem(this.keyConfigPort), 10);
    let address: any = localStorage.getItem(this.keyConfigUrl);
    address = address || 'localhost';
    return { port: port || 5170, url: address };
  }

  _test() {
    const config = this.getConfig();

    const headers = { 'X-no-api': 'true' };

    const urll = `http://${config.url}:${config.port}/`;
    return this.http.get(urll, { headers });
  }


  test(): Observable<boolean> {
    // const h = { 'X-Portinari-No-Error': 'true' };

    let h = new HttpHeaders().set('X-Portinari-No-Error', 'true'); // create header object
    h = h.append('X-no-api', 'true'); // add a new header, creating a new object


    const config = this.getConfig();
    const urll = `http://${config.url}:${config.port}/`;

    const observer = new Observable<boolean>(o => {
      this.http.get(urll, { headers: h }).subscribe(res => {
        o.next(true);
      }, err => {
        o.next(false);
      });
    });

    return observer;

  }

  getPrinters(): Observable<any[]> {
    const config = this.getConfig();
    const urll = `http://${config.url}:${config.port}/ListPrinters`;
    const headers = { 'X-no-api': 'true' };
    return this.http.get<any[]>(urll, { headers });

  }

  getDocModels(dir: string): Observable<any[]> {
    const config = this.getConfig();
    const urll = `http://${config.url}:${config.port}/DocsModels?dir=${dir}`;
    const headers = { 'X-no-api': 'true' };
    return this.http.get<any[]>(urll, { headers });
  }

  saveDocModelsDir(dir: string) {
    localStorage.setItem(this.keyDocModelsDir, dir);
  }
  getDocModelsDir() {
    return localStorage.getItem(this.keyDocModelsDir) || 'c://temp';
  }

  savePrinter(printer: string) {
    localStorage.setItem(this.keyPrinterName, printer);
  }

  getPrinterName() {
    return localStorage.getItem(this.keyPrinterName);
  }

  print(obj: any) {
    const config = this.getConfig();
    const urll = `http://${config.url}:${config.port}/Print`;
    const headers = { 'X-no-api': 'true' };
    return this.http.post(urll, obj, { headers });
  }


}
