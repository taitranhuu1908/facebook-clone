package work.nguyentruonganhkiet.api.model.entities;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import work.nguyentruonganhkiet.api.model.base.BaseEntity;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class Role extends BaseEntity {

	@Column(name = "name", nullable = false, unique = true)
	private String name;

	@ManyToMany
	@JoinTable(name = "role_permissions",
			joinColumns = @JoinColumn(name = "role_id"),
			inverseJoinColumns = @JoinColumn(name = "permissions_id"))
	private Set<Permission> permissions = new LinkedHashSet<>();

	@ManyToMany
	@JoinTable(name = "role_users",
			joinColumns = @JoinColumn(name = "role_id"),
			inverseJoinColumns = @JoinColumn(name = "users_id"))
	private Set<User> users = new LinkedHashSet<>();

}

