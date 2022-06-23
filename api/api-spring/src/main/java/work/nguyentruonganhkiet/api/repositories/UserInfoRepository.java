package work.nguyentruonganhkiet.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import work.nguyentruonganhkiet.api.model.entities.UserInfo;

public interface UserInfoRepository extends JpaRepository<UserInfo, Long> {
}
