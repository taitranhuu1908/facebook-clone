package work.nguyentruonganhkiet.api.model.dtos.responses.entities;

import lombok.Data;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Set;

@Data
public class PostDto implements Serializable {
	private Long id;
	private Timestamp createdAt;
	private Timestamp updatedAt;
	private boolean isDelete;
	private String title;
	private String slug;
	private String thumbnail;
	private String description;
	private String body;
	private String views;
	private String cover;
	private UserDto user;
	private Set<ReactPostDto> reactPosts;
	private Set<CommentPostDto> commentPosts;
}
