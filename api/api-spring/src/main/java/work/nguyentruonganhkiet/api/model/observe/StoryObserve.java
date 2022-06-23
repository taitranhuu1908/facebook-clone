package work.nguyentruonganhkiet.api.model.observe;

import work.nguyentruonganhkiet.api.model.entities.Story;

import javax.persistence.PostPersist;

public class StoryObserve {

	@PostPersist
	private void beforeCreateStory( Story story ) {
	}

}
