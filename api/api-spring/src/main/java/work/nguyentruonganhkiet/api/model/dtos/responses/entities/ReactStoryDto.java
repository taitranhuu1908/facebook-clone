package work.nguyentruonganhkiet.api.model.dtos.responses.entities;

import lombok.Data;
import work.nguyentruonganhkiet.api.model.enums.ReactType;

import java.io.Serializable;
import java.sql.Timestamp;

@Data
public class ReactStoryDto implements Serializable {
    private  Long id;
    private  Timestamp createdAt;
    private  Timestamp updatedAt;
    private  boolean isDelete;
    private  ReactType reactType;
    private  int reactCount;
}
