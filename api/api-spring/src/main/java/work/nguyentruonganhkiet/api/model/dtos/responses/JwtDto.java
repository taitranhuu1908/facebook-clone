package work.nguyentruonganhkiet.api.model.dtos.responses;


import lombok.Builder;
import lombok.Data;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

@Data
@Builder
public class JwtDto {
	private String token;
	private String type;
	private UserDetails user;
	private int expiresIn;
	private List<String> roles;
}
