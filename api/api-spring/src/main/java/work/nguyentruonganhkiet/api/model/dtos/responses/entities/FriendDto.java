package work.nguyentruonganhkiet.api.model.dtos.responses.entities;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import work.nguyentruonganhkiet.api.model.enums.FriendStatus;

import java.util.List;

@Getter
@Setter
@ToString
public class FriendDto {
    public FriendStatus status;

    public UserHaftDto friend;
}
