package work.nguyentruonganhkiet.api.model.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import work.nguyentruonganhkiet.api.model.base.BaseEntity;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Users extends BaseEntity {

	@JsonIgnore
	@Column(nullable = false)
	private String password;

	@Column(unique = true, nullable = false)
	private String email;

	@ManyToMany
	@JoinTable(name = "users_roles",
			joinColumns = @JoinColumn(name = "users_id"),
			inverseJoinColumns = @JoinColumn(name = "roles_id"))
	private Set<Role> roles = new LinkedHashSet<>();

	@OneToOne(orphanRemoval = true)
	@JoinColumn(name = "user_info_id", unique = true)
	private UserInfo userInfo;

}
