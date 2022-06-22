package work.nguyentruonganhkiet.api.model.observe;

import org.springframework.beans.factory.annotation.Autowired;
import work.nguyentruonganhkiet.api.model.entities.User;
import work.nguyentruonganhkiet.api.repositories.UserRepository;

import javax.persistence.PostPersist;

public class UserObserve {

	@Autowired
	private UserRepository userRepository;

	@PostPersist
	private void beforeCreateUser( User user ) {
	}

}
