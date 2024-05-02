package vn.edu.hcmute.boardinghousemanagementsystem.runner.deserialization.processor;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.Contract;
import vn.edu.hcmute.boardinghousemanagementsystem.runner.deserialization.DeserializingChain;
import vn.edu.hcmute.boardinghousemanagementsystem.runner.deserialization.DeserializingProcessContext;
import vn.edu.hcmute.boardinghousemanagementsystem.util.MapperSingleton;

@Slf4j
public class ContractDeserializingProcessor implements DeserializingChain {
    DeserializingChain next;

    @Override
    public void setNext(DeserializingChain next) {
        this.next = next;
    }

    @Override
    public void process(byte[] jsonbBytes, DeserializingProcessContext ctx) {
        log.info("In deserializing process of Contract Deserializing Processor");
        ObjectMapper mapper = MapperSingleton.getInstance();
        try {
            Contract[] contracts = mapper.readValue(jsonbBytes, Contract[].class);
            ctx.setContextValue(contracts);
            log.info("Json is Contract type");
        } catch (Exception e) {
            log.info("Json is not Contract type");
            if (next != null) {
                next.process(jsonbBytes, ctx);
                return;
            }
            log.info("Reached end of deserializing process");

        }
    }
}
