package work.nguyentruonganhkiet.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import work.nguyentruonganhkiet.api.model.entities.Post;
import work.nguyentruonganhkiet.api.repositories.PostRepository;

import java.util.List;

public class PostService implements IBaseService<Post, Long> {


	@Autowired
	private PostRepository postRepository;

	@Override
	public Post findById( Long id ) {
		return null;
	}

	@Override
	public Post save( Post entity ) {
		return null;
	}

	@Override
	public Post update( Post entity , Long id ) {
		return null;
	}

	@Override
	public Post delete( Post entity ) {
		return null;
	}

	@Override
	public List<Post> findAll() {
		return null;
	}
}
