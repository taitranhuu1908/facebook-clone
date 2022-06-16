package work.nguyentruonganhkiet.api.model.entity;


import lombok.*;
import work.nguyentruonganhkiet.api.model.base.BaseEntity;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class Role extends BaseEntity {
    private String name;
    @ManyToMany
    @JoinTable(name = "role_permissions",
            joinColumns = @JoinColumn(name = "role_id"),
            inverseJoinColumns = @JoinColumn(name = "permissions_id"))
    private Set<Permission> permissions = new LinkedHashSet<>();

    @ManyToMany(mappedBy = "roles")
    private Set<User> users = new LinkedHashSet<>();

}
