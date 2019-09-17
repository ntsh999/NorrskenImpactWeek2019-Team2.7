import {
  Component,
  OnInit,
  Input,
  OnChanges,
  OnDestroy,
  Renderer2,
  ViewChild,
  ElementRef
} from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss']
})
export class HeroSectionComponent implements OnInit, OnChanges, OnDestroy {
  isIntroductionPage = false;
  displayVideo = false;
  showImage = false;
  isComingSoon = false;
  isResourcesPage = false;
  isWhyNSCPage = false;
  isSupportPage = false;
  isProductPage = false;
  @Input() currentRoute: string;
  @Input() showNavbar: boolean;
  @ViewChild('parentDiv') parentDiv: ElementRef;

  imageUrl = '../../../assets/hero-images/intro.jpg';
  excludedURLs = ['nsc-status', 'status', 'release-notes', 'nsc-blogs', 'nsc-faq', 'login', 'select-group'];
  comingSoonPgs = ['sla', 'contact-support', 'scheduled-maintenance',  'nsc-roadmap'];
  constructor(private renderer: Renderer2) {}
  ngOnInit() {}

  goToUrl(url): void {
    window.location.href = url;
  }
  
  ngOnChanges() {
    if (this.currentRoute) {
      this.isComingSoon =  this.validateComingSoon(this.comingSoonPgs, this.currentRoute) ? true : false;
      this.isIntroductionPage = (this.currentRoute.indexOf('introduction') > -1  || this.currentRoute === '/') ? true : false;
      this.isResourcesPage = (this.currentRoute.indexOf('resources') > -1) ? true : false;
      this.isSupportPage = (this.currentRoute.indexOf('support') > -1) ? true : false;
      this.isWhyNSCPage = (this.currentRoute.indexOf('why-nsc') > -1) ? true : false;
      this.isProductPage = (this.currentRoute.indexOf('products') > -1) ? true : false;
      this.showImage = this.validateRoute(this.excludedURLs, this.currentRoute);

      if (this.currentRoute.indexOf('features') > -1) {
        this.imageUrl = '../../../assets/hero-images/features.jpg';
      }
      if (this.currentRoute.indexOf('roadmap') > -1) {
        this.imageUrl = '../../../assets/hero-images/flexibility.jpg';
      }

      if (this.currentRoute.indexOf('documentation') > -1 || this.currentRoute.indexOf('sla') > -1) {
        this.imageUrl = '../../../assets/hero-images/coming.jpg';
      }

      if (this.currentRoute.indexOf('nsc-introduction') > -1) {
        this.imageUrl = '../../../assets/hero-images/intro.jpg';
      }
      if (this.currentRoute.indexOf('resources') > -1) {
        this.imageUrl = '../../../assets/hero-images/resources.jpg';
      }
      if (this.currentRoute.indexOf('support') > -1) {
        this.imageUrl = '../../../assets/hero-images/support.jpg';
      }
      if (this.currentRoute.indexOf('products') > -1) {
        this.imageUrl = '../../../assets/hero-images/products.jpg';
      }
      if (this.currentRoute.indexOf('why-nsc') > -1) {
        this.imageUrl = '../../../assets/hero-images/why-nsc.jpg';
      }
    }
    this.renderer.addClass(this.parentDiv.nativeElement, 'fadeIn');
    setTimeout(() => {
      this.renderer.removeClass(this.parentDiv.nativeElement, 'fadeIn');
    }, 1000);
  }
  validateRoute(excludedURLs, currentRoute) {
    return _.find(excludedURLs, item => {
      return currentRoute.indexOf(item) > -1;
    });
  }
  validateComingSoon(pages, currentRoute) {
    return _.find(pages , item => {
      return currentRoute.indexOf(item) > -1;
    });
  }
  ngOnDestroy() {
    console.log('test ngOnDestroy');
  }
}
