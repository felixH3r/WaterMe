import { Component, OnInit } from '@angular/core';
import {PLANTS} from "../../Mock.plants";

@Component({
  selector: 'app-plants-listing',
  templateUrl: './plants-listing.component.html',
  styleUrls: ['./plants-listing.component.css']
})
export class PlantsListingComponent implements OnInit {

  plants = PLANTS;

  constructor() { }

  ngOnInit(): void {
  }

}
