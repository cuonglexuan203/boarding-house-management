package vn.edu.hcmute.boardinghousemanagementsystem.runner.deserialization;

import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Component
public class DeserializingProcessContext {
    private Object[] contextValue;

    public void setContextValue(Object[] contextValue) {
        this.contextValue = contextValue;
    }

    public void deserialize(Resource resource) {
        String[] types = {"user", "role", "permission",
                "service", "contract", "invoice", "notification",
                "roomBooking", "serviceDetail", "room"};
        List<DeserializingChain> chains = Arrays.stream(types).map(DeserializingChainFactory::createChain).toList();
//        DeserializingChain chain1 = DeserializingChainFactory.createChain("user");
//        DeserializingChain chain2 = DeserializingChainFactory.createChain("role");
//        DeserializingChain chain3 = DeserializingChainFactory.createChain("permission");
        Iterator<DeserializingChain> chainIterator = chains.iterator();
        if (chainIterator.hasNext()) {
            DeserializingChain currentChain = chainIterator.next();
            while (chainIterator.hasNext()) {
                DeserializingChain nextChain = chainIterator.next();
                currentChain.setNext(nextChain);
                currentChain = nextChain;
            }
        }
        // validate: null pointer exception

        //
        try {
            if (!chains.isEmpty()) {
                chains.getFirst().process(resource, this);
            }
        } catch (IOException ioException) {
            ioException.printStackTrace();
            log.error("Error in deserialization");
        }
    }

    public Object[] getContextValue() {
        return contextValue;
    }
}
