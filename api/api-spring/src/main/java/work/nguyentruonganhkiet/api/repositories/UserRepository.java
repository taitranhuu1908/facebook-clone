package work.nguyentruonganhkiet.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import work.nguyentruonganhkiet.api.model.entity.User;

import java.util.Optional;

@Repository("userRepository")
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String username);

}
