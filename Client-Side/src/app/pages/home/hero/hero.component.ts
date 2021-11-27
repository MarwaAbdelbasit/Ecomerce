import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import SwiperCore, {Autoplay,EffectCoverflow, Navigation, Pagination, } from "swiper";

// install Swiper modules
SwiperCore.use([Autoplay,EffectCoverflow, Navigation, Pagination]);

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HeroComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
