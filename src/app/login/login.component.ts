import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';  // Inicializamos las propiedades
  password: string = '';  // Inicializamos las propiedades
  hidePassword: boolean = true
  

  constructor(private authService: AuthService) {}
  togglePassword(isMouseDown: boolean): void {
    if (isMouseDown) {
      this.hidePassword = false;
    } else {
      this.hidePassword = true;
    }
  }
  
  login(): void {
    this.authService.login(this.email, this.password).subscribe(
      response => {
        console.log('Respuesta del servidor:', response);
        const tipeuser = response.tipeuser;
        if (tipeuser == 0) {

          // Redireccionar a la página del administrador
          //this.router.navigate(['/admin']);
          Swal.fire({
            icon: 'success',
            title: `Iniciaste sesión como ADMINISTRADOR`,
            showConfirmButton: false,
            timer: 1500
          });
        } else if (tipeuser == 1) {
          // Redireccionar a la página del callcenter
          //this.router.navigate(['/callcenter']);
        } else if (tipeuser == 2) {
          // Redireccionar a la página del cliente
          //this.router.navigate(['/cliente']);
        } else {
          console.error('Tipo de usuario no válido:', tipeuser);
        }
      },
      error => {
        console.error('Error al iniciar sesión:', error);
      }
    );

  }

}
