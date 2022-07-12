package work.nguyentruonganhkiet.api.controller.api.resources;


import io.swagger.v3.oas.annotations.Parameter;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import work.nguyentruonganhkiet.api.model.dtos.requests.AddFriendRequestDto;
import work.nguyentruonganhkiet.api.model.dtos.requests.ChangeFriendStatusDto;
import work.nguyentruonganhkiet.api.model.dtos.requests.UpdateUserRequestDto;
import work.nguyentruonganhkiet.api.model.dtos.responses.MessageReturnDto;
import work.nguyentruonganhkiet.api.model.dtos.responses.entities.FriendDto;
import work.nguyentruonganhkiet.api.model.dtos.responses.entities.UserHaftDto;
import work.nguyentruonganhkiet.api.model.entities.*;
import work.nguyentruonganhkiet.api.model.enums.FriendStatus;
import work.nguyentruonganhkiet.api.model.enums.NotificationType;
import work.nguyentruonganhkiet.api.service.*;
import work.nguyentruonganhkiet.api.utils.constant.STATUS;

import javax.validation.Valid;
import java.util.List;

import static work.nguyentruonganhkiet.api.utils.constant.API.*;
import static work.nguyentruonganhkiet.api.utils.constant.STATUS.HTTP_OK;
import static work.nguyentruonganhkiet.api.utils.constant.STATUS.HTTP_OK_MESSAGE;


@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping(API_ENDPOINTS_USERS)
public class UserController {

    private final UserService userService;
    private final PostService postService;
    private final NotificationService notificationService;
    private final ModelMapper modelMapper;
    private final RoomService roomService;
    private final FriendService friendService;
    private final SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    public UserController(UserService userService, PostService postService, NotificationService notificationService, ModelMapper modelMapper, RoomService roomService, FriendService friendService, SimpMessagingTemplate simpMessagingTemplate) {
        this.userService = userService;
        this.postService = postService;
        this.notificationService = notificationService;
        this.modelMapper = modelMapper;
        this.roomService = roomService;
        this.friendService = friendService;
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    @GetMapping(GET_ID)
    public MessageReturnDto<?> getUser(@PathVariable("id") Long id, @Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails) {
        try {

            User user = userService.findByEmail(userDetails.getUsername());

            User u = userService.findById(id);

            UserHaftDto userHaftDto = modelMapper.map(u, UserHaftDto.class);

            return ResponseEntity.ok(MessageReturnDto.<UserHaftDto>builder().status(HTTP_OK).message(HTTP_OK_MESSAGE).data(userHaftDto).build()).getBody();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(MessageReturnDto.getExceptionReturn()).getBody();
        }
    }

    @GetMapping(GET_FRIENDS)
    public MessageReturnDto getAllFriends(@RequestParam(name = "status", defaultValue = "ACCEPTED") FriendStatus status, @Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails) {
        try {

            User user = userService.findByEmail(userDetails.getUsername());

            List<Friend> fs = this.friendService.findAll().stream().filter(f -> f.getUserOne().getId().equals(user.getId())).filter(f -> f.getStatus().equals(status)).toList();

            List<FriendDto> userHaftDtos = fs.stream().map(f -> this.modelMapper.map(f, FriendDto.class)).toList();

            return ResponseEntity.ok(MessageReturnDto.<List<FriendDto>>builder().message(HTTP_OK_MESSAGE).status(HTTP_OK).data(userHaftDtos).build()).getBody();

        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(MessageReturnDto.getExceptionReturn()).getBody();
        }

    }

    @PutMapping(SETTINGS_UPDATE)
    public MessageReturnDto<?> updateProfile(@Valid @RequestBody UpdateUserRequestDto updateUserRequestDto, @Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails) {
        try {
            User user = userService.findByEmail(userDetails.getUsername());

            if (updateUserRequestDto.getFirstName() != null)
                user.getUserInfo().setFirstName(updateUserRequestDto.getFirstName());
            if (updateUserRequestDto.getLastName() != null)
                user.getUserInfo().setLastName(updateUserRequestDto.getLastName());
            if (updateUserRequestDto.getPhone() != null) user.getUserInfo().setPhone(updateUserRequestDto.getPhone());
            if (updateUserRequestDto.getAddress() != null)
                user.getUserInfo().setAddress(updateUserRequestDto.getAddress());
            if (updateUserRequestDto.getAvatar() != null)
                user.getUserInfo().setAvatar(updateUserRequestDto.getAvatar());
            if (updateUserRequestDto.getCoverImage() != null)
                user.getUserInfo().setCoverImage(updateUserRequestDto.getCoverImage());
            if (updateUserRequestDto.getAbout() != null) user.getUserInfo().setAbout(updateUserRequestDto.getAbout());
            if (updateUserRequestDto.getBio() != null) user.getUserInfo().setBio(updateUserRequestDto.getBio());
            if (updateUserRequestDto.getSlug() != null) user.getUserInfo().setSlug(updateUserRequestDto.getSlug());
            if (updateUserRequestDto.getBirthday() != null)
                user.getUserInfo().setBirthday(updateUserRequestDto.getBirthday());
            if (updateUserRequestDto.getGender() != (-1))
                user.getUserInfo().setGender(updateUserRequestDto.getGender() != 0);

            this.userService.save(user);

            UserHaftDto userHaftDto = modelMapper.map(user, UserHaftDto.class);

            return ResponseEntity.status(HTTP_OK).body(MessageReturnDto.<UserHaftDto>builder().status(HTTP_OK).message(HTTP_OK_MESSAGE).data(userHaftDto).build()).getBody();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(MessageReturnDto.getExceptionReturn()).getBody();
        }

    }

    @PostMapping(UTILS_ADD_FRIEND)
    public MessageReturnDto<?> addFriend(@Valid @RequestBody AddFriendRequestDto addFriendRequestDto, @Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails) {
        try {
            User user = userService.findByEmail(userDetails.getUsername());

            User friend = userService.findByEmail(addFriendRequestDto.getEmail());

            if (user.getId().equals(friend.getId()))
                return ResponseEntity.badRequest().body(MessageReturnDto.getExceptionReturn()).getBody();

            boolean addSuccess = this.friendService.addFriend(user, friend);

            if (addSuccess) {
                Notification notification = Notification.builder().owner(user).userRef(friend).type(NotificationType.ADD_FRIEND).build();
                notificationService.save(notification);
                UserHaftDto userHaftDto = modelMapper.map(friend, UserHaftDto.class);

                simpMessagingTemplate.convertAndSend("/user/request-friend" + friend.getId(), modelMapper.map(user, UserHaftDto.class));

                return ResponseEntity.status(HTTP_OK).body(MessageReturnDto.<UserHaftDto>builder().status(HTTP_OK).message(HTTP_OK_MESSAGE).data(userHaftDto).build()).getBody();
            } else
                return ResponseEntity.badRequest().body(MessageReturnDto.getExceptionReturn()).getBody();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(MessageReturnDto.getExceptionReturn()).getBody();
        }
    }

    @PutMapping(UTILS_CHANGE_STATUS_FRIEND)
    public MessageReturnDto changeStatusFriend(@Valid @RequestBody ChangeFriendStatusDto changeFriendStatusDto, @Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails) {
        try {

            User user = userService.findByEmail(userDetails.getUsername());

            User friend = userService.findByEmail(changeFriendStatusDto.getEmailTarget());

            this.friendService.changeStatusFriend(user, friend, changeFriendStatusDto.getStatus());

            Notification notification = Notification.builder().owner(user).userRef(friend).type(NotificationType.ADD_FRIEND).build();

            notificationService.save(notification);

            return ResponseEntity.status(HTTP_OK).body(MessageReturnDto.builder().status(HTTP_OK).message(HTTP_OK_MESSAGE).build()).getBody();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(MessageReturnDto.getExceptionReturn()).getBody();
        }
    }

    @GetMapping(GET_IMAGE_OF_USER)
    public MessageReturnDto getImagesUser(@Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails) {
        try {

            User user = userService.findByEmail(userDetails.getUsername());

            List<String> images = user.getPosts().stream().map(Post::getThumbnail).toList();

            return ResponseEntity.status(HTTP_OK).body(MessageReturnDto.<List<String>>builder().status(HTTP_OK).message(HTTP_OK_MESSAGE).data(images).build()).getBody();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(MessageReturnDto.getExceptionReturn()).getBody();
        }
    }

    @PutMapping(LOCK_ACCOUNT)
    public MessageReturnDto lockAccount(@Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails) {
        try {

            User user = userService.findByEmail(userDetails.getUsername());

            this.userService.delete(user);

            return ResponseEntity.status(HTTP_OK).body(MessageReturnDto.<UserHaftDto>builder().status(HTTP_OK).message(HTTP_OK_MESSAGE).build()).getBody();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(MessageReturnDto.getExceptionReturn()).getBody();
        }
    }

    @GetMapping(FIND_BY_NAME)
    public MessageReturnDto findUserByName(@RequestParam(name = "name", defaultValue = "") String name, @Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails) {
        try {
            List<User> users = this.userService.getUsersByLastName(name);

            List<UserHaftDto> usersHaftDtos = users.stream().map(user -> modelMapper.map(user, UserHaftDto.class)).toList();

            return ResponseEntity.status(HTTP_OK).body(MessageReturnDto.<List<UserHaftDto>>builder().data(usersHaftDtos).status(HTTP_OK).message(HTTP_OK_MESSAGE).build()).getBody();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(MessageReturnDto.getExceptionReturn()).getBody();
        }
    }

    @GetMapping("get-image-of-user-email/{email}")
    public MessageReturnDto getImageByUserEmail(@RequestParam(name = "page", defaultValue = "0") int page, @RequestParam(name = "size", defaultValue = "10") int size, @RequestParam(name = "sortBy", defaultValue = "createdAt") String sortBy, @PathVariable("email") String email) {
        try {
            Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));

            User user = userService.findByEmail(email);

            List<Post> posts = user.getPosts().stream().toList();

            Page<Post> postPage = new PageImpl<>(posts, pageable, posts.size());

            List<String> images = postPage.stream().map(Post::getThumbnail).toList();

            return ResponseEntity.ok(MessageReturnDto.<List<String>>builder().status(STATUS.HTTP_OK).message(STATUS.HTTP_OK_MESSAGE).data(images).build()).getBody();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(MessageReturnDto.getExceptionReturn()).getBody();
        }
    }
}
