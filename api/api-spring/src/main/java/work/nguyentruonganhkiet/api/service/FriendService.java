package work.nguyentruonganhkiet.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import work.nguyentruonganhkiet.api.model.entities.Friend;
import work.nguyentruonganhkiet.api.model.entities.FriendRequest;
import work.nguyentruonganhkiet.api.model.entities.User;
import work.nguyentruonganhkiet.api.model.enums.FriendStatus;
import work.nguyentruonganhkiet.api.repositories.FriendRepository;
import work.nguyentruonganhkiet.api.repositories.FriendRequestRepository;

import java.util.List;

@Service
public class FriendService implements IBaseService<Friend, Long> {

	private final FriendRepository friendRepository;

	private final FriendRequestRepository friendRequestRepository;

	@Autowired
	public FriendService( FriendRepository friendRepository , FriendRequestRepository friendRequestRepository ) {
		this.friendRepository = friendRepository;
		this.friendRequestRepository = friendRequestRepository;
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
			FriendRequest fq = FriendRequest.builder().userSend(one).userReceive(two).status(FriendStatus.PENDING).build();
			this.friendRequestRepository.save(fq);
		}
		return true;
	}

	public boolean changeStatusFriend( User one , User two , FriendStatus status ) {
		List<Friend> friends = friendRepository.findAll();
		List<FriendRequest> frs = this.friendRequestRepository.findAll();
		FriendRequest fq = frs.stream().filter(f -> f.getUserSend().getId().equals(two.getId()) && f.getUserReceive().getId().equals(one.getId())).findFirst().orElse(null);
		if (fq == null)
			return false;
		if (status.equals(FriendStatus.ACCEPTED)) {
			Friend f1 = Friend.builder().userOne(one).friend(two).status(status).build();
			Friend f2 = Friend.builder().userOne(two).friend(one).status(status).build();
			this.friendRepository.save(f1);
			this.friendRepository.save(f2);
		} else {
			Friend f1 = friends.stream().filter(f -> f.getUserOne().equals(one) && f.getFriend().equals(two)).findFirst().orElse(null);
			Friend f2 = friends.stream().filter(f -> f.getUserOne().equals(two) && f.getFriend().equals(one)).findFirst().orElse(null);
			f1.setStatus(status);
			f2.setStatus(status);
			this.friendRepository.save(f1);
			this.friendRepository.save(f2);
		}
		this.friendRequestRepository.delete(fq);
		return true;
	}
}
