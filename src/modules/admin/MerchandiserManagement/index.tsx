import HitsByTime from "../merchandiser/Stats/StatsByTime";
import HitsByAgeGroup from "../merchandiser/Stats/StatsByUser";

const MerchandiserManagement = () => {
  return (
    <div>
      <h1>MD 관리자 페이지</h1>
      {/* <StatsByTime /> */}
      <HitsByAgeGroup />
      <HitsByTime />
    </div>
  );
};

export default MerchandiserManagement;
