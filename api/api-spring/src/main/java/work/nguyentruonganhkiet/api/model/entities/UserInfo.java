package work.nguyentruonganhkiet.api.model.entities;


import lombok.*;
import lombok.experimental.SuperBuilder;
import work.nguyentruonganhkiet.api.model.base.BaseEntity;

import javax.persistence.Entity;
import javax.persistence.OneToOne;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class UserInfo extends BaseEntity {

	private String fullName;
	private String birthday;
	private String phone;
	private String address;
	private String avatar;
	private String coverImage;
	private String about;
	private String bio;
	private boolean gender;

	@OneToOne(mappedBy = "userInfo", orphanRemoval = true)
	private User users;

}
