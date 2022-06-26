package work.nguyentruonganhkiet.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import work.nguyentruonganhkiet.api.model.dtos.CustomUserDetails;
import work.nguyentruonganhkiet.api.model.entities.Role;
import work.nguyentruonganhkiet.api.model.entities.User;
import work.nguyentruonganhkiet.api.repositories.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


@Service
public class UserService implements UserDetailsService, IBaseService<User, Long> {

	private final UserRepository userRepository;

	@Autowired
	public UserService( UserRepository userRepository ) {
		this.userRepository = userRepository;
	}

	@Override
	@Transactional
	public UserDetails loadUserByUsername( String username ) throws UsernameNotFoundException {
		User user = userRepository.findByEmail(username)
				.orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));

		List<GrantedAuthority> authorities = new ArrayList<>();

		Set<Role> userRoles = user.getRoles();
		for (Role role : userRoles)
			authorities.add(new SimpleGrantedAuthority(role.getName()));

		return CustomUserDetails.build(user);
	}

	@Override
	public User findById( Long id ) {
		return this.userRepository.findById(id).orElse(null).isDelete() ? null : this.userRepository.findById(id).orElse(null);
	}

	@Override
	public User save( User entity ) {
		return this.userRepository.save(entity);
	}

	@Override
	public User update( User entity , Long id ) {
		return this.userRepository.save(entity);
	}

	@Override
	public User delete( User entity ) {
		entity.setDelete(true);
		return this.userRepository.save(entity);
	}

	@Override
	public List<User> findAll() {
		return this.userRepository.findAll().stream()
				.filter(user -> ! user.isDelete())
				.collect(Collectors.toList());
	}

	public User findByEmail( String email ) {
		return this.userRepository.findByEmail(email).orElse(null);
	}

}
