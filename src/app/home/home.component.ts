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
        <input type="text" placeholder="Filter by city" #filter>
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
    </section>
    <section class="results">
      @for (housingLocation of filteredLocationList; track housingLocation.id) {
        <app-housing-location [housingLocation]="housingLocation"></app-housing-location>
      }
    </section>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {
  housingService = inject(HousingService)
  housingLocationList: HousingLocation[] = [] 
  filteredLocationList: HousingLocation[] = []

  constructor() {
    this.housingService.getAllHousingLocation().then((housingLocationList: HousingLocation[]) => {
      this.housingLocationList = housingLocationList
      this.filteredLocationList = housingLocationList
    })
  }

  filterResults(text: string) {
    if (text) {
      this.filteredLocationList = this.housingLocationList.filter(housingLocation => housingLocation.city.toLowerCase().includes(text.toLowerCase()))
    }
    else {
      this.filteredLocationList = this.housingLocationList
    }
  }
}
