import styled from "styled-components";
import Sidebar from "@/components/Sidebar";
interface LayoutProps {
  children: React.ReactNode;
}
const AppContainer = styled.div`
  display: flex;
  min-height: 400vh;
  background-color: #f0f2f5;
`;
const StyledSidebar = styled.div`
  width: 200px;
  background-color: #529e4f;
`;
const ContentContainer = styled.div`
  flex-grow: 1;
  padding: 20px;
  background-color: #fff;
  font-family: "Roboto", sans-serif;
  overflow: auto;
`;
const Layout = ({ children }: LayoutProps) => {
  return (
    <AppContainer>
      <StyledSidebar>
        <Sidebar />
      </StyledSidebar>
      <ContentContainer>{children}</ContentContainer>
    </AppContainer>
  );
};
export default Layout;
