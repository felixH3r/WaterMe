import { Component, OnInit } from '@angular/core';
import {Plants} from '../../Plants';
import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map, retry} from 'rxjs/operators';
import {HttpClientJsonpModule} from '@angular/common/http';

@Component({
  selector: 'app-plants-listing',
  templateUrl: './plants-listing.component.html',
  styleUrls: ['./plants-listing.component.css']
})
@Injectable()
export class PlantsListingComponent implements OnInit {

  plants: Plants[] = [];
  url = 'https://glossy-mason-313319.ey.r.appspot.com/getPlantData?username=Max+Mustermann';


  constructor(private http: HttpClient) { }

  getPlants(): Observable<Plants[]>{
    return this.http.jsonp<Plants[]>(this.url, 'callback');
  }

  ngOnInit(): void {
    // get method for plant data
    this.getPlants().subscribe(data => {
      this.plants = data;
      for (let plant of this.plants) {
        plant.wasserstand  = Math.trunc(plant.wasserstand);
      }
    });
  }
}
