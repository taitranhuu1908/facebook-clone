package work.nguyentruonganhkiet.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import work.nguyentruonganhkiet.api.model.entities.Post;
import work.nguyentruonganhkiet.api.repositories.PostRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostService implements IBaseService<Post, Long> {


    @Autowired
    private PostRepository postRepository;

    @Override
    public Post findById(Long id) {
        return this.postRepository.findById(id).orElse(null);
    }

    @Override
    public Post save(Post entity) {
        return this.postRepository.save(entity);
    }

    @Override
    public Post update(Post entity, Long id) {
        return this.postRepository.save(entity);
    }

    @Override
    public Post delete(Post entity) {
        entity.setDelete(true);
        return this.postRepository.save(entity);
    }

    @Override
    public List<Post> findAll() {
        List<Post> posts = (List<Post>) this.postRepository.findAll();
        return posts.stream().filter(post -> !post.isDelete()).collect(Collectors.toList());
    }

    public List<Post> findAllByUserId(Long id, Pageable pageable) {
        return this.postRepository.findAllByUserId(id, pageable);
    }
}
