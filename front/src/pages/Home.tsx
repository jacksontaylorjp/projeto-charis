import { AuthService } from "../services/AuthService";

const Home = () => {
    const authService = new AuthService();
    const handleLogouWithtGoogle = async () => {
        await authService.logoutWithGoogle();
    }
    return (
        <>
            <h1>Home</h1>
            <button onClick={handleLogouWithtGoogle}>Logout</button>
        </>
    );
}
export default Home;