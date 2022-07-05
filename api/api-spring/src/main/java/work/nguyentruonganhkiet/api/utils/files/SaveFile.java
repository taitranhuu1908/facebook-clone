package work.nguyentruonganhkiet.api.utils.files;

import com.cloudinary.Cloudinary;
import org.apache.commons.lang3.RandomStringUtils;
import org.hibernate.id.GUIDGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.web.multipart.MultipartFile;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Base64;
import java.util.Date;

public class SaveFile {

	@Autowired
	private Cloudinary cloudinary;


	ResourceLoader resourceLoader = new DefaultResourceLoader();

	@Value("${app.url}")
	String host;

	@Value("${server.port}")
	String port;

	String fullUrl = host + ":" + port;


	public String save( String base64 , String folder , String fileName ) throws IOException {
		return base64;
	}

	String generateUniqueFileName() {
		String filename = "";
		long millis = System.currentTimeMillis();
		String datetime = new Date().toGMTString();
		datetime = datetime.replace(" " , "");
		datetime = datetime.replace(":" , "");
		String rndchars = RandomStringUtils.randomAlphanumeric(16);
		filename = rndchars + "_" + datetime + "_" + millis;
		return filename;
	}

}
