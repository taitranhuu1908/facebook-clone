package work.nguyentruonganhkiet.api.controller.api.resources;


import io.swagger.v3.oas.annotations.Parameter;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import work.nguyentruonganhkiet.api.model.dtos.requests.IsMyFriendDto;
import work.nguyentruonganhkiet.api.model.dtos.responses.MessageReturnDto;
import work.nguyentruonganhkiet.api.model.dtos.responses.entities.FriendDto;
import work.nguyentruonganhkiet.api.model.dtos.responses.entities.FriendRequestDto;
import work.nguyentruonganhkiet.api.model.entities.Friend;
import work.nguyentruonganhkiet.api.model.entities.FriendRequest;
import work.nguyentruonganhkiet.api.model.entities.User;
import work.nguyentruonganhkiet.api.repositories.FriendRequestRepository;
import work.nguyentruonganhkiet.api.repositories.UserRepository;
import work.nguyentruonganhkiet.api.service.FriendService;
import work.nguyentruonganhkiet.api.service.UserService;
import work.nguyentruonganhkiet.api.utils.constant.STATUS;

import java.util.List;

import static work.nguyentruonganhkiet.api.utils.constant.API.*;
import static work.nguyentruonganhkiet.api.utils.constant.STATUS.HTTP_OK;
import static work.nguyentruonganhkiet.api.utils.constant.STATUS.HTTP_OK_MESSAGE;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping(API_ENDPOINTS_FRIENDS)
public class FriendController {

	private final UserRepository userRepository;
	private final FriendService friendService;
	private final ModelMapper modelMapper;
	private final UserService userService;

	private final FriendRequestRepository friendRequestRepository;


	@Autowired
	public FriendController( UserRepository userRepository , FriendService friendService , ModelMapper modelMapper , UserService userService , FriendRequestRepository friendRequestRepository ) {
		this.userRepository = userRepository;
		this.friendService = friendService;
		this.modelMapper = modelMapper;
		this.userService = userService;
		this.friendRequestRepository = friendRequestRepository;
	}

	@GetMapping(ALL)
	public MessageReturnDto<?> getAllFriend( @RequestParam(name = "page", defaultValue = "0") int page , @RequestParam(name = "size", defaultValue = "10") int size , @RequestParam(name = "sortBy", defaultValue = "createdAt") String sortBy , @Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails ) {
		try {
			Pageable pageable = PageRequest.of(page , size , Sort.by(sortBy));

			User user = this.userRepository.findByEmail(userDetails.getUsername()).orElse(null);

			List<Friend> fs = this.friendService.findAll().stream().filter(f -> f.getUserOne().getId().equals(user.getId())).toList();

			List<FriendDto> friendDtos = fs.stream().map(f -> this.modelMapper.map(f , FriendDto.class)).toList();

			Page<FriendDto> pageFriendDtos = new PageImpl<>(friendDtos , pageable , friendDtos.size());

			return ResponseEntity.ok(MessageReturnDto.<Page<FriendDto>>builder().message(STATUS.HTTP_OK_MESSAGE).status(STATUS.HTTP_OK).data(pageFriendDtos).build()).getBody();
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return ResponseEntity.badRequest().body(MessageReturnDto.getExceptionReturn()).getBody();
		}
	}

	@PostMapping(IS_MY_FRIEND)
	public MessageReturnDto isMyFriend( @RequestBody IsMyFriendDto isMyFriendDto , @Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails ) {
		try {
			User user = this.userService.findByEmail(userDetails.getUsername());

			User friend = this.userService.findByEmail(isMyFriendDto.getUserEmail());

			boolean isFriend = false;

			Friend f = this.friendService.findAll().stream().filter(ff -> ff.getFriend().getId().equals(friend.getId()) && ff.getUserOne().getId().equals(user.getId())).findFirst().orElse(null);

			if (f != null) isFriend = true;

			return ResponseEntity.status(HTTP_OK).body(MessageReturnDto.<Boolean>builder().status(HTTP_OK).message(HTTP_OK_MESSAGE).data(isFriend).build()).getBody();
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return ResponseEntity.badRequest().body(MessageReturnDto.getExceptionReturn()).getBody();
		}
	}

	@GetMapping(GET_FRIEND_REQUEST)
	public MessageReturnDto getFriendRequest( @RequestParam(name = "page", defaultValue = "0") int page , @RequestParam(name = "size", defaultValue = "10") int size , @RequestParam(name = "sortBy", defaultValue = "createdAt") String sortBy , @Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails ) {
		try {
			Pageable pageable = PageRequest.of(page , size , Sort.by(sortBy));

			User user = this.userService.findByEmail(userDetails.getUsername());

			List<FriendRequest> frs = this.friendRequestRepository.findAll().stream().filter(fr -> fr.getUserReceive().getId().equals(user.getId())).toList();

			List<FriendRequestDto> frDtos = frs.stream().map(fr -> modelMapper.map(fr , FriendRequestDto.class)).toList();

			Page<FriendRequestDto> pagefrdtos = new PageImpl<>(frDtos , pageable , frDtos.size());

			return ResponseEntity.status(HTTP_OK).body(MessageReturnDto.<Page<FriendRequestDto>>builder().status(HTTP_OK).message(HTTP_OK_MESSAGE).data(pagefrdtos).build()).getBody();
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return ResponseEntity.badRequest().body(MessageReturnDto.getExceptionReturn()).getBody();
		}
	}
}
