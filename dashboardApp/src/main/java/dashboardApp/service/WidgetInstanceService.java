package dashboardApp.service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dashboardApp.db.User;
import dashboardApp.db.WidgetInstance;
import dashboardApp.db.WidgetInstanceRepository;

@Service
public class WidgetInstanceService {
    
    @Autowired
    WidgetInstanceRepository widgetInstanceRepository;

    public Optional<WidgetInstance> getWidgetInstanceById(Long id) {
        return widgetInstanceRepository.findById(id);
    }

    public List<WidgetInstance> getInstancesByUser(User user) {
        return widgetInstanceRepository.findByUser(user);
    }

    public void createNewInstance(WidgetInstance widgetInstance) {
        widgetInstanceRepository.save(widgetInstance);
    }

    public void updateInstanceById(Long id, HashMap<String, String> stringParams, HashMap<String, Integer> intParams) {
        Optional<WidgetInstance> widgetInstance = widgetInstanceRepository.findById(id);
        if (!widgetInstance.isEmpty()) {
            WidgetInstance updatedInstance = widgetInstance.get();
            updatedInstance.setStringParams(stringParams);
            updatedInstance.setIntParams(intParams);
            widgetInstanceRepository.save(updatedInstance);
        } else {
            System.out.println("INCORRECT WIDGET ID!");
        }
    }

    public void deleteInstanceById(Long id) {
        widgetInstanceRepository.deleteById(id);
    }
}
