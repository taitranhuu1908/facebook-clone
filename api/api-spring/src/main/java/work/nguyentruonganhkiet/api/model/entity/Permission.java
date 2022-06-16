package work.nguyentruonganhkiet.api.model.entity;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import work.nguyentruonganhkiet.api.model.base.BaseEntity;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import java.util.LinkedHashSet;
import java.util.Set;


@Entity
@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class Permission extends BaseEntity {
    private String name;

    @ManyToMany(mappedBy = "permissions")
    private Set<Role> roles = new LinkedHashSet<>();

}
