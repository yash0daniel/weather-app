import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CountriesDataService } from '../shared-services/countries-data.service';

// interface data{
//   Countries?: any[]
//   States?: any[]
//   Cities?: any[]
// }

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})


export class WeatherComponent implements OnInit {

  weather: any = 'Some Data of weather'
  cityName: any = []
  location: any = "";
  locationControl = new FormControl('');

  selectedCountryID: any = -1;
  selectedStateID: any = -1;
  selectedCityID: any = -1;

  countryInfo: any = "";
  stateInfo: any = "";
  cityInfo: any = "";

  constructor(private country: CountriesDataService) { }

  ngOnInit(): void {
    this.allcountries();
    // this.onChangeCountry("Hi");
  }

  allcountries() {
    this.country.getCountries().
      subscribe(
        data2 => {
          // console.log('Data:', data2);
          var myData: any = data2
          this.countryInfo = myData.Countries;
        },
        err => console.log(err),
        // () => console.log('complete')
      )
  }

  onChangeCountry() {
    this.selectedStateID = this.selectedCityID = -1;
    this.cityInfo = [];
    this.stateInfo = this.countryInfo[this.selectedCountryID].States;
    // this.cityInfo = this.stateInfo[0].Cities;
    // console.log(this.cityInfo);
    // console.log(this.stateInfo)
  }

  onChangeState() {
    this.selectedCityID = -1;
    this.cityInfo = this.stateInfo[this.selectedStateID].Cities;
    // console.log(this.cityInfo);
    // console.log(this.stateInfo[this.selectedStateID].StateName)
  }

  addCity(newCity: any) {
    if (this.cityName.indexOf(this.cityInfo[newCity]) == -1) {
      //this.cityName.push(this.locationControl.value);
      this.cityName.push(this.cityInfo[newCity])
      this.location = this.cityName[this.cityName.length - 1]
    }
    else
      console.log("already in teh list")
  }

}
