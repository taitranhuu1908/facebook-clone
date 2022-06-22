package work.nguyentruonganhkiet.api.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import work.nguyentruonganhkiet.api.repositories.PostRepository;
import work.nguyentruonganhkiet.api.repositories.ReactRepository;
import work.nguyentruonganhkiet.api.repositories.StoryRepository;

@RestController
@RequestMapping("/api/test")
public class TestController {

	@Autowired
	private StoryRepository storyRepository;
	@Autowired
	private ReactRepository reactRepository;
	@Autowired
	private PostRepository postRepository;

	@GetMapping("/all")
	public String allAccess() {
		return "Public Content.";
	}

	@GetMapping("/user")
	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	public String userAccess() {
		return "User Content.";
	}

	@GetMapping("/mod")
	@PreAuthorize("hasRole('MODERATOR')")
	public String moderatorAccess() {
		return "Moderator Board.";
	}

	@GetMapping("/admin")
	@PreAuthorize("hasRole('ADMIN')")
	public String adminAccess() {
		return "Admin Board.";
	}


}
