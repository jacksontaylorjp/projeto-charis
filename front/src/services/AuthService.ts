import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../config/firebase";

export class AuthService {
    async loginWithGoogle() {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const idToken = await user.getIdToken();
            if (idToken) {
                sessionStorage.setItem("token", idToken);
            }
        } catch (error) {
            console.error("Erro ao fazer login:", error);
        }
    };
    async logoutWithGoogle() {
        try {
            auth.signOut();
            sessionStorage.removeItem("token");
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
        }
    };
}