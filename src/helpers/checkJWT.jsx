import {jwtDecode} from "jwt-decode";

export function checkJwt(jwt) {
    return jwtDecode(jwt).exp * 1000 >= Date.now();
}