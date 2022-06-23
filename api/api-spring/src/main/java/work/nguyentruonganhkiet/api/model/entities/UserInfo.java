package work.nguyentruonganhkiet.api.model.entities;


import lombok.*;
import lombok.experimental.SuperBuilder;
import work.nguyentruonganhkiet.api.model.base.BaseEntity;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.OneToOne;
import java.util.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class UserInfo extends BaseEntity {

    private String fullName;
    private Date birthday;
    private String phone;
    private String address;
    private String avatar;
    private String coverImage;
    private String about;
    private String bio;
    private boolean gender;

    @OneToOne(mappedBy = "userInfo", orphanRemoval = true, cascade = CascadeType.ALL)
    private User users;

}
