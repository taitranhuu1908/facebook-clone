package work.nguyentruonganhkiet.api.model.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

	@JsonIgnore
	@Column(nullable = false)
	private String password;

	@Column(unique = true, nullable = false)
	private String email;
	@OneToOne(orphanRemoval = true)
	@JoinColumn(name = "user_info_id", unique = true)
	private UserInfo userInfo;
	@ManyToMany(mappedBy = "users")
	private Set<Role> roles = new LinkedHashSet<>();

	@OneToMany(mappedBy = "user", orphanRemoval = true)
	private Set<Comment> comments = new LinkedHashSet<>();

	@OneToMany(mappedBy = "user", orphanRemoval = true)
	private Set<Story> stories = new LinkedHashSet<>();

	@ManyToMany(mappedBy = "users")
	private Set<Room> rooms = new LinkedHashSet<>();

	@OneToMany(mappedBy = "user", orphanRemoval = true)
	private Set<Message> messages = new LinkedHashSet<>();

}
