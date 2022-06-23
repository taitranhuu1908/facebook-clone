package work.nguyentruonganhkiet.api.model.dtos.reponses.entities;

import lombok.Data;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Set;

@Data
public class RoomDto implements Serializable {
    private final Long id;
    private final Timestamp createdAt;
    private final Timestamp updatedAt;
    private final boolean isDelete;
    private final String name;
    private final Set<UserDto> users;
    private final Set<MessageDto> messages;
}
