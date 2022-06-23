package work.nguyentruonganhkiet.api.model.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import work.nguyentruonganhkiet.api.model.base.BaseEntity;
import work.nguyentruonganhkiet.api.model.sub.ReactComment;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class Comment extends BaseEntity {
	public String comment;

	@OneToMany(mappedBy = "comment", orphanRemoval = true)
	private Set<ReactComment> reactComments = new LinkedHashSet<>();

	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

}
