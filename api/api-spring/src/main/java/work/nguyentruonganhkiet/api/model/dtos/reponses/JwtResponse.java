package work.nguyentruonganhkiet.api.model.dtos.reponses;


import lombok.Builder;
import lombok.Data;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

@Data
@Builder
public class JwtResponse {
	private String token;
	private String type;
	private UserDetails user;
	private List<String> roles;
}
