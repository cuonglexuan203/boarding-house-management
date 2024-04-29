package vn.edu.hcmute.boardinghousemanagementsystem.runner.deserialization;

import vn.edu.hcmute.boardinghousemanagementsystem.runner.deserialization.processor.PermissionDeserializingProcessor;
import vn.edu.hcmute.boardinghousemanagementsystem.runner.deserialization.processor.RoleDeserializingProcessor;
import vn.edu.hcmute.boardinghousemanagementsystem.runner.deserialization.processor.UserDeserializingProcessor;

public class DeserializingChainFactory {
    public static DeserializingChain createChain(String type){
        return switch(type){
            case "user" -> new UserDeserializingProcessor();
            case "role" -> new RoleDeserializingProcessor();
            case "permission", "rights" -> new PermissionDeserializingProcessor();
            default -> null;
        };
    }
}
