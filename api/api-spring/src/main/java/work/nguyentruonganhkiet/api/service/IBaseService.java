package work.nguyentruonganhkiet.api.service;

import java.util.List;

public interface IBaseService<T, K> {

	T findById( K id );

	T save( T entity );

	T update( T entity , K id );

	T delete( T entity );

	List<T> findAll();

}
