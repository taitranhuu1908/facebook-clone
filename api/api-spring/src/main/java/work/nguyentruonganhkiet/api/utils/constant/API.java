package work.nguyentruonganhkiet.api.utils.constant;

public class API {

	public static final String API_VERSION = "v1";

	public static final String API_PREFIX = "/api";
	public static final String API_PREFIX_V1 = API_PREFIX + "/" + API_VERSION;

	public static final String API_ENDPOINTS_AUTH = API_PREFIX_V1 + "/auth";

	public static final String API_ENDPOINTS_AUTH_LOGIN = "/login";

	public static final String API_ENDPOINTS_AUTH_REGISTER = "/register";

	public static final String API_ENDPOINTS_AUTH_ME = "/me";

	public static final String API_ENDPOINTS_USERS = API_PREFIX_V1 + "/users";

	public static final String API_ENDPOINTS_POSTS = API_PREFIX_V1 + "/posts";

	public static final String API_ENDPOINTS_COMMENTS = API_PREFIX_V1 + "/comments";

	public static final String API_ENDPOINTS_STORIES = API_PREFIX_V1 + "/stories";


}
