import { Component, inject } from '@angular/core';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housing-location';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HousingLocationComponent],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city">
        <button class="primary" type="button">Search</button>
      </form>
    </section>
    <section class="results">
      @for (housingLocation of housingLocationList; track housingLocation.id) {
        <app-housing-location [housingLocation]="housingLocation"></app-housing-location>
      }
    </section>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {
  housingService = inject(HousingService)
  housingLocationList: HousingLocation[] = [] 
  constructor() {
    this.housingLocationList = this.housingService.getAllHousingLocation()
  }
}
