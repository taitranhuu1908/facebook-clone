package work.nguyentruonganhkiet.api.model.dtos.responses.entities;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@ToString
public class StoryDto implements Serializable {
	private Long id;
	private Timestamp createdAt;
	private Timestamp updatedAt;
	private boolean isDelete = false;
	private String title;
	private String image;
	private String slug;
	private UserHaftDto user;
	private Set<ReactStoryDto> reactStories = new LinkedHashSet<>();
	private Set<CommentStoryDto> commentStories = new LinkedHashSet<>();
}
