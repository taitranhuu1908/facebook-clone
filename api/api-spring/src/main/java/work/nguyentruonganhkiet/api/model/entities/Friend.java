package work.nguyentruonganhkiet.api.model.entities;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import work.nguyentruonganhkiet.api.model.base.BaseEntity;
import work.nguyentruonganhkiet.api.model.enums.FriendStatus;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class Friend extends BaseEntity {

	public FriendStatus status = FriendStatus.PENDING;

	@ManyToOne(cascade = CascadeType.ALL, optional = false)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

}
