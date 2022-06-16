package work.nguyentruonganhkiet.api.controllers.auth;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import work.nguyentruonganhkiet.api.model.dtos.UserDetailsImpl;
import work.nguyentruonganhkiet.api.model.entity.Role;
import work.nguyentruonganhkiet.api.model.entity.User;
import work.nguyentruonganhkiet.api.model.resquest.LoginRequest;
import work.nguyentruonganhkiet.api.model.resquest.SignupRequest;
import work.nguyentruonganhkiet.api.repositories.RoleRepository;
import work.nguyentruonganhkiet.api.repositories.UserRepository;
import work.nguyentruonganhkiet.api.utils.JwtUtils;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @PostMapping(value = "/signin", consumes = "application/json")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        String jwt = jwtUtils.generateJwtToken(userDetails);

        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(jwt);
    }

    @PostMapping(value = "/signup", consumes = "application/json")
    public ResponseEntity<?> register(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body("Error: Username is already taken!");
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body("Error: Email is already in use!");
        }

        User user = User.builder().email(signUpRequest.getEmail()).password(encoder.encode(signUpRequest.getPassword())).build();

        Set<Role> roles = new HashSet<>();

        Role userRole = roleRepository.findByName("ROLE_USER")
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(userRole);

        user.setRoles(roles);
        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully!");
    }

}
