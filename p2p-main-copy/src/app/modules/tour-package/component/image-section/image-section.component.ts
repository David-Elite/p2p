import { Component, OnInit, Input } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';
import { TourPackageResolver } from '../../tour-package.resolver';

@Component({
  selector: 'app-image-section',
  templateUrl: './image-section.component.html',
  styleUrls: ['./image-section.component.scss']
})
export class ImageSectionComponent implements OnInit {
  @Input() title='';
  // @Input() images='';
  @Input() video='';
  @Input() review='';
  @Input() price1='';
  @Input() price2='';
  @Input() highlights :any;
  @Input() days = '';
  @Input() nights = '';
  @Input() price = '';
  @Input() comparedPrice = '';
  @Input() images: any = [];
  @Input() coverImage: any;
  @Input() reviewCount: any;
  _albums: any =  [];

  package: any;

  constructor(
    private _lightbox: Lightbox,
    private tourPackageResolver: TourPackageResolver
  ) {  
    this.tourPackageResolver.package.subscribe(pkg => this.package = pkg); 
  }
  
 
  ngOnInit(): void {
    const image = this.images.map(function(value:any){
      return value.url;
     });
     console.log(image)

    const src = `${image[0]}`;
    const album = {
       src: src,
    }
    this._albums.push(album);


   const coverImageId = this.images.find((i:any) =>{
      return i.id === this.coverImage
  });
   console.log(coverImageId);
  }

  getCoverImage(): string {
    if (this.coverImage) {
      return this.images.find((i: any) => i.id === this.coverImage)?.url as string;
    } else {
      return this.images[0].url as string;
    }
  }

  open(index: number): void {
    // open lightbox
    this._lightbox.open(this._albums, index);
  }
 
  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }


}
