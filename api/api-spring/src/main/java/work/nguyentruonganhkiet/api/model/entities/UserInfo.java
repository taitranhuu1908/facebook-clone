package work.nguyentruonganhkiet.api.model.entities;


import lombok.*;
import work.nguyentruonganhkiet.api.model.base.BaseEntity;

import javax.persistence.Entity;
import javax.persistence.OneToOne;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserInfo extends BaseEntity {

	private String fullName;
	private String phone;
	private String address;
	private String avatar;
	private String coverImage;
	private String about;
	private String birthday;
	private String bio;

	@OneToOne(mappedBy = "userInfo", orphanRemoval = true)
	private Users users;

}
