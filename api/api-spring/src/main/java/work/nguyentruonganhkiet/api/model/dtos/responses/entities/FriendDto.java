package work.nguyentruonganhkiet.api.model.dtos.responses.entities;

import lombok.Data;
import work.nguyentruonganhkiet.api.model.enums.FriendStatus;

import java.io.Serializable;
import java.sql.Timestamp;

@Data
public class FriendDto implements Serializable {
	private final Long id;
	private final Timestamp createdAt;
	private final Timestamp updatedAt;
	private final boolean isDelete;
	private final FriendStatus status;
	private final UserDto user;

	@Data
	public static class UserDto implements Serializable {
		private final Long id;
		private final Timestamp createdAt;
		private final Timestamp updatedAt;
		private final boolean isDelete;
		private final String password;
		private final String email;
		private final UserInfoDto userInfo;
	}
}
