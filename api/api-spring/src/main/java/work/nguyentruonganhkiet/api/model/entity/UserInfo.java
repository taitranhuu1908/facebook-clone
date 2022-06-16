package work.nguyentruonganhkiet.api.model.entity;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import work.nguyentruonganhkiet.api.model.base.BaseEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.util.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class UserInfo extends BaseEntity {

    @Column(columnDefinition = "VARCHAR(2000)")
    private String fullName;
    @Column(columnDefinition = "VARCHAR(2000)")
    private String address;
    @Column(columnDefinition = "VARCHAR(2000)")
    private String phone;
    @Column(columnDefinition = "VARCHAR(2000)")
    private String avatar;
    @Column(columnDefinition = "VARCHAR(2000)")
    private String coverImage;
    @Column(columnDefinition = "VARCHAR(2000)")
    private String bio;

    private Date birthday;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
