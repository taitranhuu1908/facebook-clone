package work.nguyentruonganhkiet.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import work.nguyentruonganhkiet.api.model.entities.React;

import java.util.List;
import java.util.Optional;

public interface ReactRepository extends JpaRepository<React, Long> {
}
