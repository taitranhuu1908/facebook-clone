package work.nguyentruonganhkiet.api.config;


import com.cloudinary.Cloudinary;
import com.github.javafaker.Faker;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import work.nguyentruonganhkiet.api.utils.files.SaveFile;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class BeanConfig {
	@Bean
	public SaveFile saveFile() {
		return new SaveFile();
	}

	@Bean
	public Faker faker() {
		return new Faker();
	}

	@Bean
	public Cloudinary cloudinaryConfig() {
		Cloudinary cloudinary = null;
		Map config = new HashMap();
		config.put("cloud_name" , "dmdshzi2v");
		config.put("api_key" , "177615227724776");
		config.put("api_secret" , "Y-iNnJXZtr61xaq1lqv5GC9lwow");
		cloudinary = new Cloudinary(config);
		return cloudinary;
	}
}
