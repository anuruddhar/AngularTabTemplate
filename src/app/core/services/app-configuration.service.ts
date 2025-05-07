import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalVariable } from 'src/app/shared/globals';


interface AppConfiguration {
  Apibase: string;
  Apimobilebase: string;
  Country: string;
  ReleseType: string;
  Version: string;
}

@Injectable({ providedIn: 'root' })
export class AppConfigurationService {

  private readonly CONFIG_URL = 'assets/app-configuration.json';
  private configuration!: AppConfiguration;

  constructor(private http: HttpClient) {
  }

  public async loadConfigurations(): Promise<any> {
    this.configuration = await this.getConfig().toPromise() as AppConfiguration;

    GlobalVariable.Country = this.configuration.Country;
    GlobalVariable.Apibase = this.configuration.Apibase;
    GlobalVariable.ReleseType = this.configuration.ReleseType;
    GlobalVariable.Version = this.configuration.Version;
  }

  private getConfig(): Observable<AppConfiguration> {
    return this.http.get<AppConfiguration>(this.CONFIG_URL);
  }


}
