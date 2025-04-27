import { Flex, Spin } from "antd";

const Loading = () => {
    return (
        <Flex justify="center" align="center" style={{ minHeight: "100vh" }}>
            <Spin tip="Carregando..." size="large" />
        </Flex>
    )
}
export default Loading;