import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) {
  }

  get(endpoint: string, params?: any) {
    return firstValueFrom(this.http.get(endpoint, {params}))
  }

  post(endpoint: string, params: any) {
    return firstValueFrom(this.http.post(endpoint, params))
  }
}
