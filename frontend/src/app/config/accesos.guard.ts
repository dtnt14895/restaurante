import { Inject } from "@angular/core"
import{ CanActivateFn, Router } from "@angular/router"
import { LoginService } from "../services/login.service"

export const AccesosGuard: CanActivateFn = (route, state) =>{
    const _loginService = Inject(LoginService)
    const _ruta = Inject(Router)

    const token = _loginService.obtenerToken();

    if(!token){
        sessionStorage.clear();
        _ruta.navigateByUrl("login");
        return false;
    } else{
        return true;
    }

}
