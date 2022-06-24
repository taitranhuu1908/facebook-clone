package work.nguyentruonganhkiet.api.model.dtos.requests;


import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;

@Data
public class PostCreateDto {
	@Null
	private String thumbnail;
	@Null
	private String description;
	@NotBlank
	@NotNull
	private String body;
	@Null
	private String cover;
}
