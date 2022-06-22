package work.nguyentruonganhkiet.api.model.entities;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import work.nguyentruonganhkiet.api.model.base.BaseEntity;
import work.nguyentruonganhkiet.api.model.observe.PostObserve;
import work.nguyentruonganhkiet.api.model.sub.CommentPost;
import work.nguyentruonganhkiet.api.model.sub.ReactPost;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@DiscriminatorValue("POST")
@EntityListeners(PostObserve.class)
public class Post extends BaseEntity {

	private String title;
	private String slug;
	private String thumbnail;
	private String description;
	private String body;
	@Column(columnDefinition = "int default 0")
	private String views;
	private String cover;

	@OneToMany(mappedBy = "post", orphanRemoval = true)
	private Set<ReactPost> reactPosts = new LinkedHashSet<>();

	@OneToMany(mappedBy = "post", orphanRemoval = true)
	private Set<CommentPost> commentPosts = new LinkedHashSet<>();

}
