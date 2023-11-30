import { HeaderContainer } from "@/components/Header";
import HitsByAgeGroup from "../merchandiser/Stats/StatsByUser";

const MerchandiserManagement = () => {
  return (
    <div>
      <HeaderContainer>
        <p>MD 페이지</p>
      </HeaderContainer>
      <HitsByAgeGroup />
    </div>
  );
};

export default MerchandiserManagement;
