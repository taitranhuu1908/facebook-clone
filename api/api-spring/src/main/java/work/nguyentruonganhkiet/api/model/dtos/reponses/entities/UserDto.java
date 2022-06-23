package work.nguyentruonganhkiet.api.model.dtos.reponses.entities;

import lombok.Data;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Set;

@Data
public class UserDto implements Serializable {
    private  Long id;
    private  Timestamp createdAt;
    private  Timestamp updatedAt;
    private  boolean isDelete;
    private  String password;
    private  String email;
    private  UserInfoDto userInfo;
    private  Set<CommentDto> comments;
    private  Set<StoryDto> stories;
    private  Set<RoomDto> rooms;
    private  Set<RoleDto> roles;
    private  Set<PostDto> posts;
}
