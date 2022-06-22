package work.nguyentruonganhkiet.api.model.entities;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import work.nguyentruonganhkiet.api.model.base.BaseEntity;
import work.nguyentruonganhkiet.api.model.observe.StoryObserve;
import work.nguyentruonganhkiet.api.model.sub.CommentStory;
import work.nguyentruonganhkiet.api.model.sub.ReactStory;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@EntityListeners(StoryObserve.class)
public class Story extends BaseEntity {

	private String title;
	private String image;
	private String slug;

	@OneToMany(mappedBy = "story", orphanRemoval = true)
	private Set<ReactStory> reactStories = new LinkedHashSet<>();

	@OneToMany(mappedBy = "story", orphanRemoval = true)
	private Set<CommentStory> commentStories = new LinkedHashSet<>();

	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

}
