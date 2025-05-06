import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateEventDto {
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNumber()
    value: number;
    
    @IsNumber()
    vacancies: number;
    
    // @IsDate()
    // startDate: Timestamp;

    // @IsDate()
    // endDate: Timestamp;
}
