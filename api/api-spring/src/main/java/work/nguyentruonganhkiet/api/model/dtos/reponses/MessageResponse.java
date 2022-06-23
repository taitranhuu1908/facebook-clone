package work.nguyentruonganhkiet.api.model.dtos.reponses;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MessageResponse<T> {

	private Integer status;

	private String message;

	private T data;
}
