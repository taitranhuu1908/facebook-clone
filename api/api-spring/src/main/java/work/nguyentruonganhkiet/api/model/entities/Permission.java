package work.nguyentruonganhkiet.api.model.entities;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import work.nguyentruonganhkiet.api.model.base.BaseEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class Permission extends BaseEntity {

	@Column(name = "name", nullable = false, unique = true)
	private String name;

	@ManyToMany(mappedBy = "permissions")
	private Set<Role> roles = new LinkedHashSet<>();

}
