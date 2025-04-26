import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { Header } from "antd/es/layout/layout";
import SiderBar from "./components/SiderBar";
// import Settings from "./components/Settings";

const { Content, Footer } = Layout;

const MainLayout = () => {
    return (
        <Layout style={{ height: "100vh" }}>
            <SiderBar />
            <Layout style={{ background: "#e9f2f9", display: "flex", flexDirection: "column", height: "100vh" }}>
                <Header style={{ display: "flex", justifyContent: "flex-end", padding: 0, marginRight: "15px", background: "#e9f2f9"}}>
                    {/* <Settings /> */}
                </Header>
                <Content style={{ flex: 1, padding: "16px", overflow: "auto" }}>
                    <Outlet />
                </Content>
                <Footer style={{ textAlign: "center", background: "#e9f2f9" }}>
                    © Copyright {new Date().getFullYear()} Projeto charis.
                    Desenvolvido por <a href="https://www.instagram.com/jackson_taylor_jt" target="_blank">JtDev</a>
                </Footer>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
