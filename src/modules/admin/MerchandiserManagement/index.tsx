import { HeaderContainer } from "@/components/Header";
import HitsByAgeGroup from "../merchandiser/Stats/StatsByUser";

const MerchandiserManagement = () => {
  return (
    <div>
      <HeaderContainer>
        <p>MD 페이지</p>
      </HeaderContainer>
      {/* <StatsByTime /> */}
      <HitsByAgeGroup />
      {/* <Merchandise /> */}

      {/* <HitsByTime /> */}
    </div>
  );
};

export default MerchandiserManagement;
