import { Avatar, Dropdown, Flex, Typography } from "antd";
import { ChevronsUpDown, LogOutIcon } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { AuthService } from "../services/AuthService";

const Settings = () => {
    const { user } = useAuth();
    const handleLogout = async () => {
        const authService = new AuthService();
        try {
            await authService.logoutWithGoogle();
        } catch (error) {
            console.error("Erro no logout:", error);
        }
    };
    const itemsDropdown = [
        {
            key: "1",
            icon: <LogOutIcon size={14} />,
            label: "Sair",
            onClick: handleLogout,
        },
    ].map((item) => ({
        ...item,
        style: {  },
    }));
    return (
        <Flex align='center' justify='space-around' style={{ color: "#fff", marginBottom: 10 }} gap={"10px"}>
            <Flex align='center' gap={5}>
                <Avatar src={user?.photoURL} />
                <Typography style={{ color: "#fff" }}>{user?.displayName?.split(" ")[0]}</Typography>
            </Flex>
            <Dropdown menu={{ items: itemsDropdown }}>
                <ChevronsUpDown size={"18px"} style={{cursor: "pointer"}}/>
            </Dropdown>
        </Flex>
    );
}
export default Settings;