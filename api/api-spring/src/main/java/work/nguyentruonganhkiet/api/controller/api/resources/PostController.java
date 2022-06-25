package work.nguyentruonganhkiet.api.controller.api.resources;


import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import work.nguyentruonganhkiet.api.model.dtos.requests.PostCreateDto;
import work.nguyentruonganhkiet.api.model.dtos.responses.MessageReturnDto;
import work.nguyentruonganhkiet.api.model.dtos.responses.entities.PostDto;
import work.nguyentruonganhkiet.api.model.entities.Post;
import work.nguyentruonganhkiet.api.model.entities.User;
import work.nguyentruonganhkiet.api.repositories.PostRepository;
import work.nguyentruonganhkiet.api.repositories.UserRepository;
import work.nguyentruonganhkiet.api.utils.constant.STATUS;

import javax.validation.Valid;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import static work.nguyentruonganhkiet.api.utils.constant.API.API_ENDPOINTS_POSTS;

@RestController
@RequestMapping(API_ENDPOINTS_POSTS)
public class PostController {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PostRepository postRepository;

	@Autowired
	private ModelMapper modelMapper;

	@GetMapping("/friends")
	public MessageReturnDto<List<PostDto>> getAllPostsOfFriends(
			@RequestParam(name = "page", defaultValue = "0") int page ,
			@RequestParam(name = "size", defaultValue = "10") int size ,
			@RequestParam(name = "sortBy", defaultValue = "createdAt") String sortBy
	) {

		Pageable pageable = PageRequest.of(page , size , Sort.by(sortBy));

		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

		User user = userRepository.findByEmail(userDetails.getUsername()).orElseThrow(() -> new RuntimeException("User not found"));

		List<Post> posts = this.postRepository.findAllByUserId(user.getId() , pageable);

		List<PostDto> postDtos = posts.stream().map(post -> modelMapper.map(post , PostDto.class)).collect(Collectors.toList());

		return MessageReturnDto.
				<List<PostDto>>builder()
				.data(postDtos)
				.message(STATUS.HTTP_OK_MESSAGE)
				.status(STATUS.HTTP_OK)
				.build();

	}

	@PostMapping("/create")
	public MessageReturnDto<PostDto> createPost( @Valid @RequestBody PostCreateDto post ) {

		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

		User user = userRepository.findByEmail(userDetails.getUsername()).orElseThrow(() -> new RuntimeException("User not found"));

		try {
			Post p = this.postRepository.save(Post
					.builder()
					.user(user)
					.body(post.getBody())
					.thumbnail(post.getThumbnail())
					.description(post.getDescription())
					.body(post.getBody())
					.cover(post.getCover())
					.build());

			PostDto pr = modelMapper.map(p , PostDto.class);

			return MessageReturnDto.<PostDto>builder()
					.status(STATUS.HTTP_OK)
					.message(STATUS.HTTP_OK_MESSAGE)
					.data(pr)
					.build();
		} catch (Exception e) {
			return MessageReturnDto.getExceptionReturn();
		}
	}

	@PutMapping("/update/{id}")
	public MessageReturnDto<PostDto> updatePost( @PathVariable("id") Long id , @Valid @RequestBody PostCreateDto post ) {

		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

		User user = userRepository.findByEmail(userDetails.getUsername()).orElseThrow(() -> new RuntimeException("User not found"));

		Post p = this.postRepository.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));

		if (! Objects.equals(p.getUser().getId() , user.getId()))
			return MessageReturnDto.<PostDto>builder()
					.status(STATUS.HTTP_BAD_REQUEST)
					.message(STATUS.HTTP_BAD_REQUEST_MESSAGE)
					.build();

		if (p.isDelete())
			return MessageReturnDto.<PostDto>builder()
					.status(STATUS.HTTP_BAD_REQUEST)
					.message(STATUS.HTTP_BAD_REQUEST_MESSAGE)
					.build();

		p.setBody(post.getBody());
		p.setThumbnail(post.getThumbnail());
		p.setDescription(post.getDescription());
		p.setBody(post.getBody());
		p.setCover(post.getCover());

		PostDto pr = modelMapper.map(p , PostDto.class);

		return MessageReturnDto.
				<PostDto>builder()
				.data(pr)
				.message(STATUS.HTTP_OK_MESSAGE)
				.status(STATUS.HTTP_OK)
				.build();
	}

	@DeleteMapping("/delete/{id}")
	public MessageReturnDto<PostDto> deletePost( @PathVariable("id") Long id ) {
		Post p = this.postRepository.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));
		p.setDelete(true);
		this.postRepository.save(p);

		PostDto pr = modelMapper.map(p , PostDto.class);

		return MessageReturnDto.<PostDto>builder()
				.status(STATUS.HTTP_OK)
				.message(STATUS.HTTP_OK_MESSAGE)
				.data(pr)
				.build();
	}
}
