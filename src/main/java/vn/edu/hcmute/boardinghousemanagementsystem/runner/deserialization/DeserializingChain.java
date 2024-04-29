package vn.edu.hcmute.boardinghousemanagementsystem.runner.deserialization;

import org.apache.commons.io.FileUtils;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

public interface DeserializingChain {
    void setNext(DeserializingChain next);

    void process(byte[] jsonbBytes, DeserializingProcessContext context);

    default void process(File file,  DeserializingProcessContext context) throws IOException {
        process(FileUtils.readFileToByteArray(file), context);
    }

    default void process(String json,  DeserializingProcessContext context) {
        process(json.getBytes(StandardCharsets.UTF_8), context);
    }

    default void process(Resource resource,  DeserializingProcessContext context) throws IOException {
        process(resource.getContentAsByteArray(), context);
    }

}
