import { Timestamp } from "firebase-admin/firestore";
import { IEvent } from "./event.interface";
import { IsBoolean, IsOptional, IsString } from "class-validator";

export class CreateEventDto implements IEvent {
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description?: string;

    // @IsDate()
    // startDate: Timestamp;

    // @IsDate()
    // endDate: Timestamp;

    @IsBoolean()
    registrationOpen: boolean;

    @IsString()
    createdBy: string;

    // @IsDate()
    // createdAt: Timestamp;

    // @IsDate()
    // updatedAt: Timestamp;
}
