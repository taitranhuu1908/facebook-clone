package work.nguyentruonganhkiet.api.controller.api.resources;

import io.swagger.v3.oas.annotations.Parameter;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import work.nguyentruonganhkiet.api.model.dtos.requests.CommentPostRequestDto;
import work.nguyentruonganhkiet.api.model.dtos.requests.CreateStoryRequestDto;
import work.nguyentruonganhkiet.api.model.dtos.requests.ReactRequestDto;
import work.nguyentruonganhkiet.api.model.dtos.responses.MessageReturnDto;
import work.nguyentruonganhkiet.api.model.dtos.responses.entities.PostDto;
import work.nguyentruonganhkiet.api.model.dtos.responses.entities.StoryDto;
import work.nguyentruonganhkiet.api.model.entities.*;
import work.nguyentruonganhkiet.api.model.enums.FriendStatus;
import work.nguyentruonganhkiet.api.model.sub.CommentPost;
import work.nguyentruonganhkiet.api.model.sub.CommentStory;
import work.nguyentruonganhkiet.api.model.sub.ReactStory;
import work.nguyentruonganhkiet.api.service.FriendService;
import work.nguyentruonganhkiet.api.service.NotificationService;
import work.nguyentruonganhkiet.api.service.StoryService;
import work.nguyentruonganhkiet.api.service.UserService;
import work.nguyentruonganhkiet.api.utils.constant.STATUS;

import javax.validation.Valid;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

import static work.nguyentruonganhkiet.api.utils.constant.API.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping(API_ENDPOINTS_STORIES)
public class StoryController {

	private final StoryService storyService;
	private final UserService userService;
	private final ModelMapper modelMapper;
	private final NotificationService notificationService;
	private final FriendService friendService;

	@Autowired
	public StoryController( StoryService storyService , ModelMapper modelMapper , UserService userService , NotificationService notificationService , FriendService friendService ) {
		this.storyService = storyService;
		this.modelMapper = modelMapper;
		this.userService = userService;
		this.notificationService = notificationService;
		this.friendService = friendService;
	}


	@GetMapping(FRIENDS)
	public MessageReturnDto<List<StoryDto>> getAllStoryOfFriends( @RequestParam(name = "page", defaultValue = "0") int page , @RequestParam(name = "size", defaultValue = "10") int size , @RequestParam(name = "sortBy", defaultValue = "createdAt") String sortBy , @Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails ) {
		try {
			Pageable pageable = PageRequest.of(page , size , Sort.by(sortBy));

			User user = userService.findByEmail(userDetails.getUsername());

			List<Friend> friends = this.friendService.findAll().stream().filter(f -> f.getUserOne().getId().equals(user.getId())).toList();

			List<Story> stories = friends.stream().map(f -> f.getFriend().getStories()).flatMap(Collection::stream).toList();

			stories.forEach(post -> {
				Set<CommentStory> commentStories = post.getCommentStories().stream().sorted(( a , b ) -> b.getCreatedAt().compareTo(a.getCreatedAt())).limit(5).collect(Collectors.toSet());
				post.setCommentStories(commentStories);
			});

			List<StoryDto> storyDtos = stories.stream().map(post -> modelMapper.map(post , StoryDto.class)).toList();

			Page<StoryDto> pageStories = new PageImpl<>(storyDtos , pageable , stories.size());

			return ResponseEntity.ok(MessageReturnDto.<List<StoryDto>>builder().message(STATUS.HTTP_OK_MESSAGE).status(STATUS.HTTP_OK).data(pageStories.getContent()).paginate(pageable).build()).getBody();
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return ResponseEntity.badRequest().body(MessageReturnDto.getExceptionReturn()).getBody();
		}
	}

	@GetMapping(ALL)
	public MessageReturnDto<List<StoryDto>> getAllStory( @RequestParam(name = "page", defaultValue = "0") int page , @RequestParam(name = "size", defaultValue = "10") int size , @RequestParam(name = "sortBy", defaultValue = "createdAt") String sortBy , @Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails ) {
		try {
			Pageable pageable = PageRequest.of(page , size , Sort.by(sortBy));

			User user = userService.findByEmail(userDetails.getUsername());

			List<Story> storys = this.storyService.findAllByUserId(user.getId() , pageable);

			storys.forEach(story -> {
				Set<CommentStory> commentStorys = story.getCommentStories().stream().sorted(( a , b ) -> b.getCreatedAt().compareTo(a.getCreatedAt())).limit(5).collect(Collectors.toSet());
				story.setCommentStories(commentStorys);
			});

			if (storys.isEmpty())
				return MessageReturnDto.<List<StoryDto>>builder().data(null).message(STATUS.HTTP_OK_MESSAGE).status(STATUS.HTTP_OK).build();

			List<StoryDto> storiesDtos = storys.stream().map(story -> modelMapper.map(story , StoryDto.class)).toList();

			return ResponseEntity.ok(MessageReturnDto.<List<StoryDto>>builder().data(storiesDtos).message(STATUS.HTTP_OK_MESSAGE).status(STATUS.HTTP_OK).paginate(pageable).build()).getBody();
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return ResponseEntity.badRequest().body(MessageReturnDto.getExceptionReturn()).getBody();
		}
	}

	@GetMapping(GET_ID)
	public MessageReturnDto<StoryDto> getStoryById( @PathVariable("id") Long id ) {
		try {

			Story story = this.storyService.findById(id);

			if (story == null)
				return ResponseEntity.badRequest().body(MessageReturnDto.<StoryDto>builder().status(STATUS.HTTP_BAD_REQUEST).message(STATUS.HTTP_BAD_REQUEST_MESSAGE).data(null).build()).getBody();

			StoryDto storyDto = this.modelMapper.map(story , StoryDto.class);

			return ResponseEntity.ok(MessageReturnDto.<StoryDto>builder().status(STATUS.HTTP_OK).message(STATUS.HTTP_OK_MESSAGE).data(storyDto).build()).getBody();
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return ResponseEntity.badRequest().body(MessageReturnDto.getExceptionReturn()).getBody();
		}
	}

	@PostMapping(CREATE)
	public MessageReturnDto<StoryDto> createStory( @Valid @RequestBody CreateStoryRequestDto createStoryRequestDto , @Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails ) {
		try {

			User user = this.userService.findByEmail(userDetails.getUsername());

			Story s = this.storyService.save(Story.builder().image(createStoryRequestDto.getImage()).title(createStoryRequestDto.getTitle()).user(user).build());

			StoryDto storyDto = this.modelMapper.map(s , StoryDto.class);

			return ResponseEntity.ok(MessageReturnDto.<StoryDto>builder().status(STATUS.HTTP_OK).message(STATUS.HTTP_OK_MESSAGE).data(storyDto).build()).getBody();
		} catch (Exception e) {
			System.out.println(e.getMessage());
			System.out.println(e.getMessage());
			return ResponseEntity.badRequest().body(MessageReturnDto.getExceptionReturn()).getBody();
		}
	}

	@PutMapping(UPDATE_ID)
	public MessageReturnDto<StoryDto> updateStory( @PathVariable("id") Long id , @Valid @RequestBody CreateStoryRequestDto createStoryRequestDto , @Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails ) {
		try {
			User user = this.userService.findByEmail(userDetails.getUsername());

			Story story = this.storyService.findById(id);

			if (story == null)
				return ResponseEntity.badRequest().body(MessageReturnDto.<StoryDto>builder().status(STATUS.HTTP_BAD_REQUEST).message(STATUS.HTTP_BAD_REQUEST_MESSAGE).data(null).build()).getBody();

			if (! Objects.equals(story.getUser().getId() , user.getId()))
				return ResponseEntity.badRequest().body(MessageReturnDto.<StoryDto>builder().status(STATUS.HTTP_BAD_REQUEST).message(STATUS.HTTP_BAD_REQUEST_MESSAGE).data(null).build()).getBody();

			if (createStoryRequestDto.getImage() != null) story.setImage(createStoryRequestDto.getImage());
			if (createStoryRequestDto.getTitle() != null) story.setTitle(createStoryRequestDto.getTitle());

			Story s = this.storyService.save(story);

			StoryDto storyDto = this.modelMapper.map(s , StoryDto.class);

			return ResponseEntity.ok(MessageReturnDto.<StoryDto>builder().status(STATUS.HTTP_OK).message(STATUS.HTTP_OK_MESSAGE).data(storyDto).build()).getBody();
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return ResponseEntity.badRequest().body(MessageReturnDto.getExceptionReturn()).getBody();
		}
	}

	@DeleteMapping(DELETE_ID)
	public MessageReturnDto<StoryDto> deleteStory( @PathVariable("id") Long id , @Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails ) {
		try {

			User user = this.userService.findByEmail(userDetails.getUsername());

			Story s = this.storyService.findById(id);

			if (! Objects.equals(s.getUser().getId() , user.getId()))
				return ResponseEntity.badRequest().body(MessageReturnDto.<StoryDto>builder().status(STATUS.HTTP_BAD_REQUEST).message(STATUS.HTTP_BAD_REQUEST_MESSAGE).data(null).build()).getBody();

			this.storyService.delete(s);

			StoryDto storyDto = this.modelMapper.map(s , StoryDto.class);

			return ResponseEntity.ok(MessageReturnDto.<StoryDto>builder().status(STATUS.HTTP_OK).message(STATUS.HTTP_OK_MESSAGE).data(storyDto).build()).getBody();

		} catch (Exception e) {
			System.out.println(e.getMessage());
			return ResponseEntity.badRequest().body(MessageReturnDto.getExceptionReturn()).getBody();
		}
	}

	@PostMapping(REACT_ID)
	public MessageReturnDto<StoryDto> reactStory( @PathVariable("id") Long id , @Valid @RequestBody ReactRequestDto reactRequestDto , @Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails ) {
		try {

			User user = this.userService.findByEmail(userDetails.getUsername());

			Story s = this.storyService.findById(id);

			ReactStory reactStory = ReactStory.builder().reactType(reactRequestDto.getReactType()).user(user).story(s).build();

			Story sr = this.storyService.reactToStory(s , reactStory);

			Notification notification = Notification.builder().storyRef(s).reactRef(reactStory).build();

			this.notificationService.reactStoryNotification(s , s.getUser() , user , notification);

			StoryDto storyDto = this.modelMapper.map(sr , StoryDto.class);

			return ResponseEntity.ok(MessageReturnDto.<StoryDto>builder().status(STATUS.HTTP_OK).message(STATUS.HTTP_OK_MESSAGE).data(storyDto).build()).getBody();

		} catch (Exception e) {
			System.out.println(e.getMessage());
			return ResponseEntity.badRequest().body(MessageReturnDto.getExceptionReturn()).getBody();
		}
	}

	@PostMapping(COMMENT_ID)
	public MessageReturnDto<StoryDto> commentPost( @PathVariable("id") Long id , @Valid @RequestBody CommentPostRequestDto comment , @Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails ) {
		try {

			User user = userService.findByEmail(userDetails.getUsername());

			Story s = this.storyService.findById(id);

			CommentStory commentStory = CommentStory.builder().comment(comment.getComment()).user(user).story(s).build();

			Story pr = this.storyService.commentToStory(s , commentStory);

			Notification notification = Notification.builder().storyRef(s).commentRef(commentStory).build();

			this.notificationService.commentStoryNotification(s , s.getUser() , user , notification);

			StoryDto prdto = modelMapper.map(pr , StoryDto.class);

			return ResponseEntity.ok(MessageReturnDto.<StoryDto>builder().status(STATUS.HTTP_OK).message(STATUS.HTTP_OK_MESSAGE).data(prdto).build()).getBody();

		} catch (Exception e) {
			System.out.println(e.getMessage());
			return ResponseEntity.badRequest().body(MessageReturnDto.getExceptionReturn()).getBody();
		}
	}

}
