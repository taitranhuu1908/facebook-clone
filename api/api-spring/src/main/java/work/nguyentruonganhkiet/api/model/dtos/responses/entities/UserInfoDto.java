package work.nguyentruonganhkiet.api.model.dtos.responses.entities;

import lombok.Data;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Date;

@Data
public class UserInfoDto implements Serializable {
    private Long id;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private boolean isDelete;
    private String fullName;
    private Date birthday;
    private String phone;
    private String address;
    private String avatar;
    private String coverImage;
    private String about;
    private String bio;
    private boolean gender;
}
