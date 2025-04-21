import { AuthService } from "../services/AuthService";
import { TestService } from "../services/testService";

const Home = () => {
    const authService = new AuthService();
    const testService = new TestService();
    const handleLogouWithtGoogle = async () => {
        await authService.logoutWithGoogle();
    }
    const test = async () => {
        await testService.profile();
    }
    return (
        <>
            <h1>Home</h1>
            <button onClick={test}>test</button>
            <button onClick={handleLogouWithtGoogle}>Logout</button>
        </>
    );
}
export default Home;