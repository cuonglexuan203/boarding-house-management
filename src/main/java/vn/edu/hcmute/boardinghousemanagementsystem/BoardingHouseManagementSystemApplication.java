package vn.edu.hcmute.boardinghousemanagementsystem;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@Slf4j
@SpringBootApplication
public class BoardingHouseManagementSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(BoardingHouseManagementSystemApplication.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner(@Value("${server.port}") String serverPort){
		return args -> {
			log.info("Server is running on port: " + serverPort);
		};
	}
}
