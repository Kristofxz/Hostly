import { Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Stay } from '../models/stay.model';
import { StayService } from './stay.service';

@Injectable({
  providedIn: 'root'
})
export class StayResolver  {

  constructor(private stayService: StayService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Stay> {
    const stayId = route.params['stayId']
    return this.stayService.getById(stayId)
  }
}
