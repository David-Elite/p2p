import { Component, OnInit,HostListener, Input} from '@angular/core';

@Component({
  selector: 'app-image-section',
  templateUrl: './image-section.component.html',
  styleUrls: ['./image-section.component.scss']
})
export class ImageSectionComponent implements OnInit {
@Input() title='';

  constructor(

  ) {

   }
  


  ngOnInit(): void {
  }
  form_variable = false;
  
  @HostListener("document:scroll")

  scrollFunction(){
       const verticalOff =  window.pageYOffset;
       if(verticalOff > 400 ){
         this.form_variable = true;
       }else if(verticalOff < 400){
         this.form_variable = false;
       }
  }

}
