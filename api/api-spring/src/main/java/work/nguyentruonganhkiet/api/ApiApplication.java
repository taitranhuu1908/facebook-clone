package work.nguyentruonganhkiet.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

//@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
@SpringBootApplication
public class ApiApplication {

	public static void main( String[] args ) {

		SpringApplication.run(ApiApplication.class , args);

	}

}
