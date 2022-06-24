package work.nguyentruonganhkiet.api.model.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import work.nguyentruonganhkiet.api.model.base.BaseEntity;
import work.nguyentruonganhkiet.api.model.observe.UserObserve;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Table(name = "users")
@EntityListeners(UserObserve.class)
public class User extends BaseEntity {

	@Column(nullable = false)
	private String password;

	@Column(unique = true, nullable = false)
	private String email;
	@OneToOne(orphanRemoval = true, cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinColumn(name = "user_info_id", unique = true)
	private UserInfo userInfo;

	@OneToMany(mappedBy = "user", orphanRemoval = true, cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private Set<Comment> comments = new LinkedHashSet<>();

	@OneToMany(mappedBy = "user", orphanRemoval = true, cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private Set<Story> stories = new LinkedHashSet<>();

	@ManyToMany(mappedBy = "users", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private Set<Room> rooms = new LinkedHashSet<>();

	@OneToMany(mappedBy = "user", orphanRemoval = true, cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private Set<Message> messages = new LinkedHashSet<>();

	@ManyToMany(mappedBy = "users", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private Set<Role> roles = new LinkedHashSet<>();

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<Post> posts = new LinkedHashSet<>();

	@OneToMany(mappedBy = "user", orphanRemoval = true)
	private Set<Friend> friends = new LinkedHashSet<>();

}
