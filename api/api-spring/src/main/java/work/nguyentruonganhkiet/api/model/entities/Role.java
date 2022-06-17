package work.nguyentruonganhkiet.api.model.entities;


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
public class Role extends BaseEntity {

	@Column(name = "name", nullable = false, unique = true)
	private String name;


	@ManyToMany(mappedBy = "roles")
	private Set<Users> userses = new LinkedHashSet<>();

	@ManyToMany
	@JoinTable(name = "role_permissions",
			joinColumns = @JoinColumn(name = "role_id"),
			inverseJoinColumns = @JoinColumn(name = "permissions_id"))
	private Set<Permission> permissions = new LinkedHashSet<>();

}

