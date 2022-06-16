package work.nguyentruonganhkiet.api.model.base;


import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;

@MappedSuperclass
@Getter
@Setter
public abstract class BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column()
    private Boolean isDeleted = false;

    @Column()
    private Boolean isActivated = true;

    @CreationTimestamp
    private Date createdAt;

    @CreationTimestamp
    private Date updatedAt;

}
