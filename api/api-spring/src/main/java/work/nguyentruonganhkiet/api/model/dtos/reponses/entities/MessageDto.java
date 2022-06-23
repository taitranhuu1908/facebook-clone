package work.nguyentruonganhkiet.api.model.dtos.reponses.entities;

import lombok.Data;

import java.io.Serializable;
import java.sql.Timestamp;

@Data
public class MessageDto implements Serializable {
    private  Long id;
    private  Timestamp createdAt;
    private  Timestamp updatedAt;
    private  boolean isDelete;
    private  String message;
    private  String media;
}
