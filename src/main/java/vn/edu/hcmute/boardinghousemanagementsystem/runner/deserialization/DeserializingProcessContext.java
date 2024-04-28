package vn.edu.hcmute.boardinghousemanagementsystem.runner.deserialization;

import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Slf4j
@Component
public class DeserializingProcessContext {
    private Object[] contextValue;

    public void setContextValue(Object[] contextValue) {
        this.contextValue = contextValue;
    }

    public void deserialize(Resource resource) {
        DeserializingChain chain1 = DeserializingChainFactory.createChain("user");
        DeserializingChain chain2 = DeserializingChainFactory.createChain("role");
        DeserializingChain chain3 = DeserializingChainFactory.createChain("permission");

        chain1.setNext(chain2);
        chain2.setNext(chain3);
        // validate: null pointer exception

        //
        try {
            chain1.process(resource, this);
        } catch (IOException ioException) {
            ioException.printStackTrace();
            log.error("Error in deserialization");
        }
    }

    public Object[] getContextValue() {
        return contextValue;
    }
}
