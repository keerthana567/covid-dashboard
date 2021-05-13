import { Component } from "@angular/core";
import { GlobalModel } from "./model/global.model";
import { ApiService } from "./api/api.service";

export interface Country {
  name: string;
  slug: string;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title(title: any) {
    throw new Error("Method not implemented.");
  }

  country: string;
  data: GlobalModel;
  countries: {}[];
  barChartType = "bar";
  barChartLabels: any[] = ["Infected", "Recovered", "Deaths"];
  barChartData: any[] = [{ data: [65, 76, 33], label: "Lable" }];

  constructor(private api: ApiService) {
    this.data = new GlobalModel();
  }

  ngOnInit(): void {
    this.fetchData();
    this.fetchCountries();
  }

  fetchData() {
    this.api.fetchData().subscribe((res: any[]) => {
      this.data.confiremd = res["TotalConfirmed"];
      this.data.recovered = res["TotalRecovered"];
      this.data.deaths = res["TotalDeaths"];

      this.barChartData = [
        {
          data: [this.data.confiremd, this.data.recovered, this.data.deaths],
          label: "Global",
        },
      ];
    });
  }

  fetchCountries() {
    this.api.fetchCountries().subscribe((res: any[]) => {
      this.countries = res.map((name) => {
        let country: {} = {};
        country["name"] = name["Country"];
        country["slug"] = name["Slug"];
        return country;
      });

      this.countries.sort(function (a, b) {
        let nameA = a["name"].toUpperCase();
        let nameB = b["name"].toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    });
  }

  fetchDataByCountry(country: string) {
    this.api.fetchDataByCountry(country).subscribe((res: any[]) => {
      this.data.confiremd = res[res.length - 1]["Confirmed"];
      this.data.recovered = res[res.length - 1]["Recovered"];
      this.data.deaths = res[res.length - 1]["Deaths"];

      this.barChartData = [
        {
          data: [this.data.confiremd, this.data.recovered, this.data.deaths],
          label: country,
        },
      ];
    });
  }

  countryChanged(value: string) {
    this.country = value;
    if (value == "global") {
      this.fetchData();
    } else {
      this.fetchDataByCountry(value);
    }
  }
}
