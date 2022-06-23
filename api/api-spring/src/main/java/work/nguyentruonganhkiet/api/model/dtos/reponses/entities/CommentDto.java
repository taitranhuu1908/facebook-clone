package work.nguyentruonganhkiet.api.model.dtos.reponses.entities;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Set;

@Data
public class CommentDto implements Serializable {
    private  Long id;
    private  Timestamp createdAt;
    private  Timestamp updatedAt;
    private  boolean isDelete;
    private  String comment;
    private  Set<ReactCommentDto> reactComments;
}

