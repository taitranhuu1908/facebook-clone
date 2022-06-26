package work.nguyentruonganhkiet.api.controller.api.resources;


import io.swagger.v3.oas.annotations.Parameter;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import work.nguyentruonganhkiet.api.model.dtos.requests.AddFriendRequestDto;
import work.nguyentruonganhkiet.api.model.dtos.requests.ChangeFriendStatusDto;
import work.nguyentruonganhkiet.api.model.dtos.requests.UpdateUserRequestDto;
import work.nguyentruonganhkiet.api.model.dtos.responses.MessageReturnDto;
import work.nguyentruonganhkiet.api.model.dtos.responses.entities.UserHaftDto;
import work.nguyentruonganhkiet.api.model.entities.Friend;
import work.nguyentruonganhkiet.api.model.entities.Notification;
import work.nguyentruonganhkiet.api.model.entities.User;
import work.nguyentruonganhkiet.api.model.enums.FriendStatus;
import work.nguyentruonganhkiet.api.model.enums.NotificationType;
import work.nguyentruonganhkiet.api.service.NotificationService;
import work.nguyentruonganhkiet.api.service.PostService;
import work.nguyentruonganhkiet.api.service.UserService;

import javax.validation.Valid;

import static work.nguyentruonganhkiet.api.utils.constant.API.API_ENDPOINTS_USERS;
import static work.nguyentruonganhkiet.api.utils.constant.STATUS.HTTP_OK;
import static work.nguyentruonganhkiet.api.utils.constant.STATUS.HTTP_OK_MESSAGE;

@RestController
@RequestMapping(API_ENDPOINTS_USERS)
public class UserController {

	private final UserService userService;

	private final PostService postService;

	private final NotificationService notificationService;
	private final ModelMapper modelMapper;


	@Autowired
	public UserController( UserService userService , PostService postService , NotificationService notificationService , ModelMapper modelMapper ) {
		this.userService = userService;
		this.postService = postService;
		this.notificationService = notificationService;
		this.modelMapper = modelMapper;
	}

	@GetMapping("/get/{id}")
	public MessageReturnDto<?> getUser( @PathVariable("id") Long id , @Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails ) {
		User user = userService.findByEmail(userDetails.getUsername());
		try {
			User u = userService.findById(id);

			UserHaftDto userHaftDto = modelMapper.map(u , UserHaftDto.class);

			return ResponseEntity.ok(MessageReturnDto.<UserHaftDto>builder().status(HTTP_OK).message(HTTP_OK_MESSAGE).data(userHaftDto).build()).getBody();
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(MessageReturnDto.getExceptionReturn()).getBody();
		}
	}

	@PutMapping("/settings/update")
	public MessageReturnDto<?> updateProfile( @Valid @RequestBody UpdateUserRequestDto updateUserRequestDto , @Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails ) {
		User user = userService.findByEmail(userDetails.getUsername());
		try {

			if (updateUserRequestDto.getFirstName() != null)
				user.getUserInfo().setFirstName(updateUserRequestDto.getFirstName());
			if (updateUserRequestDto.getLastName() != null)
				user.getUserInfo().setLastName(updateUserRequestDto.getLastName());
			if (updateUserRequestDto.getPhone() != null)
				user.getUserInfo().setPhone(updateUserRequestDto.getPhone());
			if (updateUserRequestDto.getAddress() != null)
				user.getUserInfo().setAddress(updateUserRequestDto.getAddress());
			if (updateUserRequestDto.getAvatar() != null)
				user.getUserInfo().setAvatar(updateUserRequestDto.getAvatar());
			if (updateUserRequestDto.getCoverImage() != null)
				user.getUserInfo().setCoverImage(updateUserRequestDto.getCoverImage());
			if (updateUserRequestDto.getAbout() != null)
				user.getUserInfo().setAbout(updateUserRequestDto.getAbout());
			if (updateUserRequestDto.getBio() != null)
				user.getUserInfo().setBio(updateUserRequestDto.getBio());
			if (updateUserRequestDto.getSlug() != null)
				user.getUserInfo().setSlug(updateUserRequestDto.getSlug());
			if (updateUserRequestDto.getBirthday() != null)
				user.getUserInfo().setBirthday(updateUserRequestDto.getBirthday());
			if (updateUserRequestDto.getGender() != ( - 1 ))
				user.getUserInfo().setGender(updateUserRequestDto.getGender() != 0);

			this.userService.save(user);

			UserHaftDto userHaftDto = modelMapper.map(user , UserHaftDto.class);

			return ResponseEntity.status(HTTP_OK).body(MessageReturnDto.<UserHaftDto>builder().status(HTTP_OK).message(HTTP_OK_MESSAGE).data(userHaftDto).build()).getBody();
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(MessageReturnDto.getExceptionReturn()).getBody();
		}
	}

	@PostMapping("/utils/add-friend")
	public MessageReturnDto<?> addFriend( @Valid @RequestBody AddFriendRequestDto addFriendRequestDto , @Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails ) {
		try {

			User user = userService.findByEmail(userDetails.getUsername());

			User friend = userService.findByEmail(addFriendRequestDto.getEmail());

			Friend f = Friend.builder().user(friend).build();

			user.getFriends().add(f);

			userService.save(user);

			Notification notification = Notification.builder().owner(user).userRef(friend).type(NotificationType.ADD_FRIEND).build();

			notificationService.save(notification);

			return ResponseEntity.status(HTTP_OK).body(MessageReturnDto.<UserHaftDto>builder().status(HTTP_OK).message(HTTP_OK_MESSAGE).build()).getBody();

		} catch (Exception e) {
			return ResponseEntity.badRequest().body(MessageReturnDto.getExceptionReturn()).getBody();
		}
	}

	@PutMapping("/utils/change-status-friend")
	public MessageReturnDto changeStatusFriend( @Valid @RequestBody ChangeFriendStatusDto changeFriendStatusDto , @Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails ) {
		try {

			User user = userService.findByEmail(userDetails.getUsername());

			User friend = userService.findByEmail(changeFriendStatusDto.getEmailTarget());

			Friend f = user.getFriends().stream().filter(friend1 -> friend1.getUser().getEmail().equals(friend.getEmail())).findFirst().get();

			f.setStatus(changeFriendStatusDto.getStatus());

			userService.save(user);

			Notification notification = Notification.builder().owner(user).userRef(friend).type(NotificationType.ADD_FRIEND).build();

			notificationService.save(notification);

			return ResponseEntity.status(HTTP_OK).body(MessageReturnDto.builder().status(HTTP_OK).message(HTTP_OK_MESSAGE).build()).getBody();

		} catch (Exception e) {
			return ResponseEntity.badRequest().body(MessageReturnDto.getExceptionReturn()).getBody();
		}
	}

}
