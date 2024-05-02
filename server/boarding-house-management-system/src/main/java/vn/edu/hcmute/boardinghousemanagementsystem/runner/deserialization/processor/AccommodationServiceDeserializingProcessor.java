package vn.edu.hcmute.boardinghousemanagementsystem.runner.deserialization.processor;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.AccommodationService;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.User;
import vn.edu.hcmute.boardinghousemanagementsystem.runner.deserialization.DeserializingChain;
import vn.edu.hcmute.boardinghousemanagementsystem.runner.deserialization.DeserializingProcessContext;
import vn.edu.hcmute.boardinghousemanagementsystem.util.MapperSingleton;

@Slf4j
public class AccommodationServiceDeserializingProcessor implements DeserializingChain {
    DeserializingChain next;

    @Override
    public void setNext(DeserializingChain next) {
        this.next = next;
    }

    @Override
    public void process(byte[] jsonbBytes, DeserializingProcessContext ctx) {
        log.info("In deserializing process of AccommodationService Deserializing Processor");
        ObjectMapper mapper = MapperSingleton.getInstance();
        try {
            AccommodationService[] accommodationServices = mapper.readValue(jsonbBytes, AccommodationService[].class);
            ctx.setContextValue(accommodationServices);
            log.info("Json is AccommodationService type");
        } catch (Exception e) {
            log.info("Json is not AccommodationService type");
            if (next != null) {
                next.process(jsonbBytes, ctx);
                return;
            }
            log.info("Reached end of deserializing process");

        }
    }
}
