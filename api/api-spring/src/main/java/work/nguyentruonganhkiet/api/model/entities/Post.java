package work.nguyentruonganhkiet.api.model.entities;


import lombok.*;
import work.nguyentruonganhkiet.api.model.base.BaseEntity;

import javax.persistence.Entity;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Post extends BaseEntity {

	private String title;
	private String slug;
	private String thumbnail;
	private String description;
	private String body;
	private String views;

}
