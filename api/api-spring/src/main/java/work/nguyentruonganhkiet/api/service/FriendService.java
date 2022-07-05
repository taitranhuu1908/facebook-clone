package work.nguyentruonganhkiet.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import work.nguyentruonganhkiet.api.model.entities.Friend;
import work.nguyentruonganhkiet.api.model.entities.User;
import work.nguyentruonganhkiet.api.model.enums.FriendStatus;
import work.nguyentruonganhkiet.api.repositories.FriendRepository;

import java.util.List;

@Service
public class FriendService implements IBaseService<Friend, Long> {

	private final FriendRepository friendRepository;

	@Autowired
	public FriendService( FriendRepository friendRepository ) {
		this.friendRepository = friendRepository;
	}

	@Override
	public Friend findById( Long id ) {
		return this.friendRepository.findById(id).orElse(null);
	}

	@Override
	public Friend save( Friend entity ) {
		return this.friendRepository.save(entity);
	}

	@Override
	public Friend update( Friend entity , Long id ) {
		return this.friendRepository.save(entity);
	}

	@Override
	public Friend delete( Friend entity ) {
		return this.friendRepository.save(entity);
	}

	public List<Friend> findAll() {
		return friendRepository.findAll().stream().filter(f -> ! f.isDelete()).toList();
	}

	public boolean addFriend( User one , User two ) {
		List<Friend> friends = friendRepository.findAll();
		boolean isFriend = friends.stream().filter(f -> f.getUserOne().equals(one) && f.getFriend().equals(two)).findFirst().orElse(null) != null;

		if (! isFriend) {
			Friend f1 = Friend.builder().status(FriendStatus.PENDING).userOne(one).friend(two).build();
			Friend f2 = Friend.builder().status(FriendStatus.PENDING).userOne(two).friend(one).build();
			friendRepository.save(f1);
			friendRepository.save(f2);
		}
		return true;
	}

	public boolean changeStatusFriend( User one , User two , FriendStatus status ) {
		List<Friend> friends = friendRepository.findAll();
		Friend f1 = friends.stream().filter(fz -> fz.getUserOne().getId().equals(one.getId()) && fz.getFriend().getId().equals(two.getId())).findFirst().orElse(null);
		if (f1 == null)
			return false;
		Friend f2 = friends.stream().filter(fz -> fz.getUserOne().getId().equals(two.getId()) && fz.getFriend().getId().equals(one.getId())).findFirst().orElse(null);
		f1.setStatus(status);
		assert f2 != null;
		f2.setStatus(status);
		return true;
	}
}
