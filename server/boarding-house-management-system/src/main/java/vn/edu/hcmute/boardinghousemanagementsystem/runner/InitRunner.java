package vn.edu.hcmute.boardinghousemanagementsystem.runner;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.Role;

@Order(0)
@Slf4j
@Component
public class InitRunner implements CommandLineRunner {

    @Value("${server.port}")
    private String serverPort;

    @Override
    public void run(String... args) throws Exception {
        log.info("Server is running on port: " + serverPort);
    }
}
