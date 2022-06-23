package work.nguyentruonganhkiet.api.controller.api;


import io.swagger.v3.oas.annotations.OpenAPI30;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import work.nguyentruonganhkiet.api.model.dtos.CustomUserDetails;
import work.nguyentruonganhkiet.api.model.dtos.reponses.JwtResponse;
import work.nguyentruonganhkiet.api.model.dtos.reponses.MessageResponse;
import work.nguyentruonganhkiet.api.model.dtos.reponses.entities.UserDto;
import work.nguyentruonganhkiet.api.model.dtos.requests.LoginDto;
import work.nguyentruonganhkiet.api.model.dtos.requests.RegisterDto;
import work.nguyentruonganhkiet.api.model.entities.Role;
import work.nguyentruonganhkiet.api.model.entities.User;
import work.nguyentruonganhkiet.api.model.entities.UserInfo;
import work.nguyentruonganhkiet.api.repositories.RoleRepository;
import work.nguyentruonganhkiet.api.repositories.UserInfoRepository;
import work.nguyentruonganhkiet.api.repositories.UserRepository;
import work.nguyentruonganhkiet.api.utils.JwtUtils;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

import static work.nguyentruonganhkiet.api.model.enums.RoleEnum.ROLE_USER;
import static work.nguyentruonganhkiet.api.utils.constant.STATUS.HTTP_BAD_REQUEST;
import static work.nguyentruonganhkiet.api.utils.constant.STATUS.HTTP_OK;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    final AuthenticationManager authenticationManager;

    final UserRepository userRepository;

    final UserInfoRepository userInfoRepository;

    final RoleRepository roleRepository;

    final PasswordEncoder encoder;

    final JwtUtils jwtUtils;

    final ModelMapper modelMapper;

    public AuthController(AuthenticationManager authenticationManager, UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder encoder, JwtUtils jwtUtils, UserInfoRepository userInfoRepository, ModelMapper modelMapper) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.encoder = encoder;
        this.jwtUtils = jwtUtils;
        this.userInfoRepository = userInfoRepository;
        this.modelMapper = modelMapper;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginDto loginRequest) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        String jwt = jwtUtils.generateJwtToken(userDetails);

        List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority()).collect(Collectors.toList());

        UserDetails user = (UserDetails) authentication.getDetails();

        return ResponseEntity.ok(JwtResponse.builder().token(jwt).type("Bearer").user(user).roles(roles).build());
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterDto signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest().body(MessageResponse.builder().status(HTTP_BAD_REQUEST).message("Email is already in use!").build());
        }

        User user = User.builder().email(signUpRequest.getEmail()).password(encoder.encode(signUpRequest.getPassword())).build();

        Role userRole = roleRepository.findByName(ROLE_USER).orElseGet(() ->
                roleRepository.save(Role.builder().name(ROLE_USER).build())
        );

        userRole.setUsers(new HashSet<>(List.of(user)));

        user.setRoles(new HashSet<>(List.of(userRole)));

        UserInfo userInfo = UserInfo.builder()
                .fullName(signUpRequest.getName())
                .gender(signUpRequest.isGender())
                .birthday(signUpRequest.getBirthday())
                .users(user)
                .build();

        userInfoRepository.save(userInfo);

        user.setUserInfo(userInfo);

        userRepository.save(user);

        return ResponseEntity.ok(MessageResponse.builder().message("User registered successfully!").status(HTTP_OK).build());
    }

    @GetMapping("/me")
    public ResponseEntity<UserDto> getUserInfo() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        User user = userRepository.findByEmail(userDetails.getUsername()).orElseThrow(() -> new RuntimeException("User not found"));

        UserDto userDto = modelMapper.map(user, UserDto.class);

        return ResponseEntity.ok(userDto);
    }

}
