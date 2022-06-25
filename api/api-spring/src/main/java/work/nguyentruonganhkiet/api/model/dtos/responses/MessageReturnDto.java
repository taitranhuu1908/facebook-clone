package work.nguyentruonganhkiet.api.model.dtos.responses;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import work.nguyentruonganhkiet.api.utils.constant.STATUS;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MessageReturnDto<T> {
	private Integer status;

	private String message;

	private T data;

	private PaginationInfo paginate;

	@Data
	public static class PaginationInfo {
		private Integer totalPage;

		private Integer totalItem;

		private Integer currentPage;

		private Integer perPage;

		private Integer totalItemPage;
	}

	public static MessageReturnDto getExceptionReturn() {
		return MessageReturnDto.builder()
				.status(STATUS.HTTP_INTERNAL_SERVER_ERROR)
				.message(STATUS.HTTP_INTERNAL_SERVER_ERROR_MESSAGE)
				.build();
	}

	public static MessageReturnDto getBadRequestReturn() {
		return MessageReturnDto.builder()
				.status(STATUS.HTTP_BAD_REQUEST)
				.message(STATUS.HTTP_BAD_REQUEST_MESSAGE)
				.build();
	}

	public static MessageReturnDto getNotFoundReturn() {
		return MessageReturnDto.builder()
				.status(STATUS.HTTP_NOT_FOUND)
				.message(STATUS.HTTP_NOT_FOUND_MESSAGE)
				.build();
	}

	public static <T> MessageReturnDto getOkReturn( T data ) {
		return MessageReturnDto.builder()
				.status(STATUS.HTTP_OK)
				.message(STATUS.HTTP_OK_MESSAGE)
				.data(data)
				.build();
	}

}
