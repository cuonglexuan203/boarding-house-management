package vn.edu.hcmute.boardinghousemanagementsystem.runner.deserialization.processor;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.Room;
import vn.edu.hcmute.boardinghousemanagementsystem.runner.deserialization.DeserializingChain;
import vn.edu.hcmute.boardinghousemanagementsystem.runner.deserialization.DeserializingProcessContext;
import vn.edu.hcmute.boardinghousemanagementsystem.util.MapperSingleton;

@Slf4j
public class RoomDeserializingProcessor implements DeserializingChain {
    DeserializingChain next;

    @Override
    public void setNext(DeserializingChain next) {
        this.next = next;
    }

    @Override
    public void process(byte[] jsonbBytes, DeserializingProcessContext ctx) {
        log.info("In deserializing process of Room Deserializing Processor");
        ObjectMapper mapper = MapperSingleton.getInstance();
        try {
            Room[] rooms = mapper.readValue(jsonbBytes, Room[].class);
            ctx.setContextValue(rooms);
            log.info("Json is Room type");
        } catch (Exception e) {
            log.info("Json is not Room type");
            if (next != null) {
                next.process(jsonbBytes, ctx);
                return;
            }
            log.info("Reached end of deserializing process");

        }
    }
}
