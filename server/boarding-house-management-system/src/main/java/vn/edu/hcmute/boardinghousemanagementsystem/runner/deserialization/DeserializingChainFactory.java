package vn.edu.hcmute.boardinghousemanagementsystem.runner.deserialization;

import vn.edu.hcmute.boardinghousemanagementsystem.runner.deserialization.processor.*;

public class DeserializingChainFactory {
    public static DeserializingChain createChain(String type) {
        return switch (type) {
            case "user" -> new UserDeserializingProcessor();
            case "role" -> new RoleDeserializingProcessor();
            case "permission", "rights" -> new PermissionDeserializingProcessor();
            case "service" -> new AccommodationServiceDeserializingProcessor();
            case "contract" -> new ContractDeserializingProcessor();
            case "invoice" -> new InvoiceDeserializingProcessor();
            case "notification" -> new NotificationDeserializingProcessor();
            case "roomBooking" -> new RoomBookingDeserializingProcessor();
            case "serviceDetail" -> new ServiceDetailDeserializingProcessor();
            case "room" -> new RoomDeserializingProcessor();
            default -> null;
        };
    }
}
