package work.nguyentruonganhkiet.api.model.dtos.requests;


import lombok.Data;

import java.util.Date;

@Data
public class RegisterDto {

	private String email;

	private String password;

	private String name;

	private Date birthday;

	private boolean gender;

}


