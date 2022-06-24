package work.nguyentruonganhkiet.api.model.dtos.responses.entities;

import lombok.Data;

import java.io.Serializable;
import java.sql.Timestamp;

@Data
public class MessageDto {
    private  Long id;
    private  Timestamp createdAt;
    private  Timestamp updatedAt;
    private  boolean isDelete;
    private  String message;
    private  String media;
}
