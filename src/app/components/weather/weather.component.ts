import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})

export class WeatherComponent {
  private apiKey: string = "4399945f14aa05f6c69472900c8899ae";
  private cityId: string = "6167865"; // Toronto, ON

  constructor(private elementRef: ElementRef) {};

  /*ngAfterViewInit(): void {
    // Add the weather widget script to the page
    var d3 = document.createElement("script");
    d3.type = "text/javascript";
    d3.src = "http://openweathermap.org/themes/openweathermap/assets/vendor/owm/js/d3.min.js";
    this.elementRef.nativeElement.appendChild(d3);

    var weatherWidget = document.createElement("script");
    weatherWidget.type = "text/javascript";
    weatherWidget.innerHTML = "window.myWidgetParam = {id: 11, cityid: " + this.cityId + ", appid: '" + this.apiKey + "', containerid: 'openweathermap-widget',}; (function() { var script = document.createElement('script'); script.type = 'text/javascript'; script.async = true; script.src = 'http://openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js'; var s = document.getElementsByTagName('script')[1]; s.parentNode.insertBefore(script, s);})();";

    this.elementRef.nativeElement.appendChild(weatherWidget);
  }*/

  ngAfterViewInit(): void {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://oap.accuweather.com/launch.js";
    this.elementRef.nativeElement.appendChild(script);

    //<script type="text/javascript" src="http://oap.accuweather.com/launch.js"></script>
  }
}
