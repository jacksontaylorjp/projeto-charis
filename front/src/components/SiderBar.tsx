import { Home, Users } from 'lucide-react';
import { Flex, Image, Layout, Menu } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Settings from './Settings';
import logo from "../../public/logocharis1.png"
const { Sider } = Layout;

const items = [
    { key: "1", icon: <Home />, label: "Início", path: "adm/home" },
    { key: "2", icon: <Users />, label: "Eventos", path: "adm/inscricoes" },
].map((item) => ({
    ...item,
    style: { color: "#3a89c9" },
}));

const SiderBar = () => {
    const [openSider, setOpenSider] = useState(false);
    const navigate = useNavigate();

    return (
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
                console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
                setOpenSider(collapsed)
            }}
            style={{
                backgroundColor: "#1b325f",
            }}
        >
            <Flex justify='space-between' vertical style={{ height: "100%" }}>
                <Flex align='center' vertical>
                    <Image src={logo} alt='logo' preview={false} width={150} />
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={["1"]}
                        onClick={({ key }) => {
                            const item = items.find(i => i.key === key);
                            if (item) navigate(item.path);
                        }}
                        items={items.map((item) => ({
                            ...item,
                            style: { color: "#fff", fontSize: "16px" }
                        }))}
                        style={{ background: "#1b325f" }}
                        className="custom-menu"
                    />

                </Flex>
                {!openSider &&
                    <Settings />
                }
            </Flex>
        </Sider>
    );
}

export default SiderBar;