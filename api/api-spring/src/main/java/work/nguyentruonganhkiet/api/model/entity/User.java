package work.nguyentruonganhkiet.api.model.entity;


import lombok.*;
import work.nguyentruonganhkiet.api.model.base.BaseEntity;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
@Table(name = "users", uniqueConstraints = {@UniqueConstraint(columnNames = {"email"})})
public class User extends BaseEntity {

    @Column(unique = true, columnDefinition = "VARCHAR(2000)")
    private String email;

    @Column(columnDefinition = "VARCHAR(2000)")
    private String password;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<UserInfo> userInfoes = new LinkedHashSet<>();

    @ManyToMany
    @JoinTable(name = "users_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "roles_id"))
    private Set<Role> roles = new LinkedHashSet<>();

}
