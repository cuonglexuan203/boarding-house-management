package vn.edu.hcmute.boardinghousemanagementsystem.runner.deserialization.processor;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.Invoice;
import vn.edu.hcmute.boardinghousemanagementsystem.runner.deserialization.DeserializingChain;
import vn.edu.hcmute.boardinghousemanagementsystem.runner.deserialization.DeserializingProcessContext;
import vn.edu.hcmute.boardinghousemanagementsystem.util.MapperSingleton;

@Slf4j
public class InvoiceDeserializingProcessor implements DeserializingChain {
    DeserializingChain next;

    @Override
    public void setNext(DeserializingChain next) {
        this.next = next;
    }

    @Override
    public void process(byte[] jsonbBytes, DeserializingProcessContext ctx) {
        log.info("In deserializing process of Invoice Deserializing Processor");
        ObjectMapper mapper = MapperSingleton.getInstance();
        try {
            Invoice[] invoices = mapper.readValue(jsonbBytes, Invoice[].class);
            ctx.setContextValue(invoices);
            log.info("Json is Invoice type");
        } catch (Exception e) {
            log.info("Json is not Invoice type");
            if (next != null) {
                next.process(jsonbBytes, ctx);
                return;
            }
            log.info("Reached end of deserializing process");

        }
    }
}
