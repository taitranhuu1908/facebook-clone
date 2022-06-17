package work.nguyentruonganhkiet.api.model.requests;


import lombok.Data;

import java.util.Set;

@Data
public class SignupRequest {

	private String email;

	private String password;

	private Set<String> role;
}


