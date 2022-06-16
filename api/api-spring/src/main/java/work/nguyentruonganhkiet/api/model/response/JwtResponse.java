package work.nguyentruonganhkiet.api.model.response;

public class JwtResponse {
    private String token;
    private String type = "Bearer";

    public JwtResponse(String accessToken) {
        this.token = accessToken;
    }
}
