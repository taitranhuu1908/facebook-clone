package work.nguyentruonganhkiet.api.model.dtos.responses.entities;

import lombok.Data;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Set;

@Data
public class CommentPostDto implements Serializable {
    private  Long id;
    private  Timestamp createdAt;
    private  Timestamp updatedAt;
    private  boolean isDelete;
    private  String comment;
    private  Set<ReactCommentDto> reactComments;
}
