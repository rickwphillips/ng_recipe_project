import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "Rick's Recipe Book App";
  loadedFeature = 'recipes';

  handleFeatureSelected( feature: string ) {
    this.loadedFeature = feature;
  }
}
