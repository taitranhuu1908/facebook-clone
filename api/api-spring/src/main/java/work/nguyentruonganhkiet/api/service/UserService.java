package work.nguyentruonganhkiet.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import work.nguyentruonganhkiet.api.model.dtos.CustomUserDetails;
import work.nguyentruonganhkiet.api.model.entities.Users;
import work.nguyentruonganhkiet.api.repository.UserRepository;


@Service
public class UserService implements UserDetailsService {

	private final UserRepository userRepository;

	@Autowired
	public UserService( UserRepository userRepository ) {
		this.userRepository = userRepository;
	}

	@Override
	@Transactional
	public UserDetails loadUserByUsername( String username ) throws UsernameNotFoundException {
		Users user = userRepository.findByEmail(username)
				.orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));

		return CustomUserDetails.build(user);
	}
}
