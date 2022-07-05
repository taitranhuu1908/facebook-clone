package work.nguyentruonganhkiet.api.model.entities;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import work.nguyentruonganhkiet.api.model.base.BaseEntity;
import work.nguyentruonganhkiet.api.model.enums.FriendStatus;

import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class FriendRequest extends BaseEntity {

	@Enumerated
	@NotNull
	public FriendStatus status = FriendStatus.PENDING;

	@OneToOne(orphanRemoval = true)
	@JoinColumn(name = "user_send_id")
	private User userSend;

	@OneToOne(orphanRemoval = true)
	@JoinColumn(name = "user_reveive_id")
	private User userReceive;

}
