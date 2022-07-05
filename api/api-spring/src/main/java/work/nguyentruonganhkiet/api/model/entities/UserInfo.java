package work.nguyentruonganhkiet.api.model.entities;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import work.nguyentruonganhkiet.api.model.base.BaseEntity;
import work.nguyentruonganhkiet.api.model.observe.UserInfoObsever;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@EntityListeners(UserInfoObsever.class)
public class UserInfo extends BaseEntity {

	@NotNull
	@Column(columnDefinition = "MEDIUMTEXT")
	private String firstName;
	@NotNull
	@Column(columnDefinition = "MEDIUMTEXT")
	private String lastName;
	@Column(columnDefinition = "MEDIUMTEXT")
	private String phone;
	@Column(columnDefinition = "MEDIUMTEXT")
	private String address;
	@Column(columnDefinition = "MEDIUMTEXT")
	private String avatar;
	@Column(columnDefinition = "MEDIUMTEXT")
	private String coverImage;
	@Column(columnDefinition = "MEDIUMTEXT")
	private String about;
	@Column(columnDefinition = "MEDIUMTEXT")
	private String bio;
	@Column(columnDefinition = "MEDIUMTEXT")
	private String slug;
	private Date birthday;
	private boolean gender;

	@OneToOne(mappedBy = "userInfo", orphanRemoval = true, cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JsonIgnore
	private User users;

}
