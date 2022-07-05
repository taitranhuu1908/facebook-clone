package work.nguyentruonganhkiet.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import work.nguyentruonganhkiet.api.model.entities.FriendRequest;

public interface FriendRequestRepository extends JpaRepository<FriendRequest, Long> {
}