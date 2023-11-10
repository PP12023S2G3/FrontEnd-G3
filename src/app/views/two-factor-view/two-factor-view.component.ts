import { Component } from '@angular/core';

@Component({
  selector: 'app-two-factor-view',
  templateUrl: './two-factor-view.component.html',
  styleUrls: ['./two-factor-view.component.css']
})
export class TwofactorViewComponent {
  modalVisible: boolean = false;

  mostrarModal() {
    this.modalVisible = true;
    this.desenfocarFondo();
    
}

desenfocarFondo() {
   var containerBlur = document.querySelector(".body-two-factor");
   containerBlur != null ? containerBlur.classList.add("blur-div"): ""; 
} 

}
