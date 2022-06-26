package work.nguyentruonganhkiet.api.controller.api.resources;

import io.swagger.v3.oas.annotations.Parameter;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import work.nguyentruonganhkiet.api.model.dtos.requests.CreateStoryRequestDto;
import work.nguyentruonganhkiet.api.model.dtos.responses.MessageReturnDto;
import work.nguyentruonganhkiet.api.model.dtos.responses.entities.StoryDto;
import work.nguyentruonganhkiet.api.model.entities.Message;
import work.nguyentruonganhkiet.api.model.entities.Story;
import work.nguyentruonganhkiet.api.model.entities.User;
import work.nguyentruonganhkiet.api.service.StoryService;
import work.nguyentruonganhkiet.api.service.UserService;
import work.nguyentruonganhkiet.api.utils.constant.STATUS;

import javax.validation.Valid;

import java.util.Objects;

import static work.nguyentruonganhkiet.api.utils.constant.API.*;

@RestController
@RequestMapping(API_ENDPOINTS_STORIES)
public class StoryController {

	private final StoryService storyService;
	private final UserService userService;
	private final ModelMapper modelMapper;


	@Autowired
	public StoryController( StoryService storyService , ModelMapper modelMapper , UserService userService ) {
		this.storyService = storyService;
		this.modelMapper = modelMapper;
		this.userService = userService;
	}


	@GetMapping("/get/{id}")
	public MessageReturnDto<StoryDto> getStoryById( @PathVariable("id") Long id ) {
		try {
			Story story = this.storyService.findById(id);
			if (story == null)
				return ResponseEntity.badRequest().body(MessageReturnDto.<StoryDto>builder().status(STATUS.HTTP_BAD_REQUEST).message(STATUS.HTTP_BAD_REQUEST_MESSAGE).data(null).build()).getBody();

			StoryDto storyDto = this.modelMapper.map(story , StoryDto.class);

			return ResponseEntity.ok(MessageReturnDto.<StoryDto>builder().status(STATUS.HTTP_OK).message(STATUS.HTTP_OK_MESSAGE).data(storyDto).build()).getBody();
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(MessageReturnDto.getExceptionReturn()).getBody();
		}
	}

	@PostMapping("/create")
	public MessageReturnDto<StoryDto> createStory( @Valid @RequestBody CreateStoryRequestDto createStoryRequestDto , @Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails ) {
		User user = this.userService.findByEmail(userDetails.getUsername());
		try {

			Story s = this.storyService.save(Story.builder().image(createStoryRequestDto.getImage()).title(createStoryRequestDto.getTitle()).user(user).build());

			StoryDto storyDto = this.modelMapper.map(s , StoryDto.class);

			return ResponseEntity.ok(MessageReturnDto.<StoryDto>builder().status(STATUS.HTTP_OK).message(STATUS.HTTP_OK_MESSAGE).data(storyDto).build()).getBody();
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(MessageReturnDto.getExceptionReturn()).getBody();
		}
	}

	@PutMapping("/update/{id}")
	public MessageReturnDto<StoryDto> updateStory( @PathVariable("id") Long id , @Valid @RequestBody CreateStoryRequestDto createStoryRequestDto , @Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails ) {
		User user = this.userService.findByEmail(userDetails.getUsername());
		try {
			Story story = this.storyService.findById(id);

			if (story == null)
				return ResponseEntity.badRequest().body(MessageReturnDto.<StoryDto>builder().status(STATUS.HTTP_BAD_REQUEST).message(STATUS.HTTP_BAD_REQUEST_MESSAGE).data(null).build()).getBody();

			if (! Objects.equals(story.getUser().getId() , user.getId()))
				return ResponseEntity.badRequest().body(MessageReturnDto.<StoryDto>builder().status(STATUS.HTTP_BAD_REQUEST).message(STATUS.HTTP_BAD_REQUEST_MESSAGE).data(null).build()).getBody();

			if (createStoryRequestDto.getImage() != null)
				story.setImage(createStoryRequestDto.getImage());
			if (createStoryRequestDto.getTitle() != null)
				story.setTitle(createStoryRequestDto.getTitle());

			Story s = this.storyService.save(story);

			StoryDto storyDto = this.modelMapper.map(s , StoryDto.class);

			return ResponseEntity.ok(MessageReturnDto.<StoryDto>builder().status(STATUS.HTTP_OK).message(STATUS.HTTP_OK_MESSAGE).data(storyDto).build()).getBody();
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(MessageReturnDto.getExceptionReturn()).getBody();
		}
	}

}
