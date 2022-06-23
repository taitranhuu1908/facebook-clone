package work.nguyentruonganhkiet.api.model.entities;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import work.nguyentruonganhkiet.api.model.base.BaseEntity;
import work.nguyentruonganhkiet.api.model.enums.ReactType;
import work.nguyentruonganhkiet.api.model.observe.ReactObserve;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@SuperBuilder
@EntityListeners(ReactObserve.class)
public abstract class React extends BaseEntity {

	@Column(name = "react_type", nullable = false)
	private ReactType reactType;

	@Column(name = "react_count", nullable = false, columnDefinition = "int default 0")
	private int reactCount;
}
