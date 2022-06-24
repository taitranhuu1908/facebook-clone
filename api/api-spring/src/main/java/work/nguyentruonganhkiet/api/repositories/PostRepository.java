package work.nguyentruonganhkiet.api.repositories;


import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import work.nguyentruonganhkiet.api.model.entities.Post;

import java.util.List;

@Repository
public interface PostRepository extends PagingAndSortingRepository<Post, Long> {

	List<Post> findAllByUserId( Long id , Pageable pageable );

}
