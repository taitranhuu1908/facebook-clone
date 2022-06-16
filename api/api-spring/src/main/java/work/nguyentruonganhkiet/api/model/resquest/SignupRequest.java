package work.nguyentruonganhkiet.api.model.resquest;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupRequest {
    private String email;
    private String password;
}
