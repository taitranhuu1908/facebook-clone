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
import work.nguyentruonganhkiet.api.model.entities.Friend;
import work.nguyentruonganhkiet.api.model.entities.Role;
import work.nguyentruonganhkiet.api.model.entities.Room;
import work.nguyentruonganhkiet.api.model.entities.User;
import work.nguyentruonganhkiet.api.model.enums.FriendStatus;
import work.nguyentruonganhkiet.api.repositories.FriendRepository;
import work.nguyentruonganhkiet.api.repositories.UserRepository;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


@Service
public class UserService implements UserDetailsService, IBaseService<User, Long> {

    private final UserRepository userRepository;
    private final RoomService roomService;
    private final FriendRepository friendRepository;

    @Autowired
    public UserService(UserRepository userRepository, RoomService roomService, FriendRepository friendRepository) {
        this.userRepository = userRepository;
        this.roomService = roomService;
        this.friendRepository = friendRepository;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));

        if (user.isDelete()) throw new UsernameNotFoundException("User Not Found with username: " + username);

        List<GrantedAuthority> authorities = new ArrayList<>();

        Set<Role> userRoles = user.getRoles();
        for (Role role : userRoles)
            authorities.add(new SimpleGrantedAuthority(role.getName()));

        return CustomUserDetails.build(user);
    }

    @Override
    public User findById(Long id) {
        return this.userRepository.findById(id).orElse(null).isDelete() ? null : this.userRepository.findById(id).orElse(null);
    }

    @Override
    public User save(User entity) {
        return this.userRepository.save(entity);
    }

    @Override
    public User update(User entity, Long id) {
        return this.userRepository.save(entity);
    }

    @Override
    public User delete(User entity) {
        entity.setDelete(true);
        return this.userRepository.save(entity);
    }

    @Override
    public List<User> findAll() {
        return this.userRepository.findAll().stream().filter(user -> !user.isDelete()).collect(Collectors.toList());
    }

    public User findByEmail(String email) {
        return this.userRepository.findByEmail(email).orElse(null);
    }

    public User getRandomUser() {
        return this.userRepository.findAll().stream().filter(user -> !user.isDelete()).findAny().orElse(null);
    }

    public long count() {
        return this.userRepository.count();
    }

    public List<User> getUsersByLastName(String lastName) {
        return this.findAll().stream().filter(f -> f.getUserInfo().getLastName().contains(lastName)).toList();
    }
}
