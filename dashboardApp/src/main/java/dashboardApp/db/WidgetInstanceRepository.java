package dashboardApp.db;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WidgetInstanceRepository extends CrudRepository<WidgetInstance, Long> {
	public List<WidgetInstance> findByUser(User user);
}