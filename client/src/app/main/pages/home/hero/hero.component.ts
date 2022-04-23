import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import SwiperCore, { Autoplay } from 'swiper';

// install Swiper modules
SwiperCore.use([Autoplay]);

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeroComponent implements OnInit {
  constructor() {}
  public slides: { title: string; subtitle: string; image: string }[] = [
    {
      title: 'Variety of products',
      subtitle: 'Let the Kids Release Their Energy',
      image: 'assets/images/slide1.jpg',
    },
    {
      title: 'Best prices',
      subtitle: 'Choose What makes you Comfortable',
      image: 'assets/images/slide2.jpg',
    },
    {
      title: 'Fastest Delivery',
      subtitle: 'Wherever you are, Whenever you want.',
      image: 'assets/images/slide3.jpeg',
    },
  ];
  ngOnInit(): void {}
}
