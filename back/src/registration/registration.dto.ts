import { IsNotEmpty, IsString } from "class-validator";
import { Registration } from "./registration.interface";
import { Timestamp } from "firebase-admin/firestore";

export class CreateRegistrationDto implements Registration {
    @IsString()
    @IsNotEmpty({ message: 'O evento é obrigatório.' })
    event: string;

    @IsString()
    @IsNotEmpty({ message: 'O nome é obrigatório.' })
    name: string;

    @IsString()
    @IsNotEmpty({ message: 'O cpf é obrigatório.' })
    cpf: string;

    @IsString()
    @IsNotEmpty({ message: 'O telefone é obrigatório.' })
    phone: string;

    @IsString()
    @IsNotEmpty({ message: 'A data de nascimento é obrigatória.' })
    birthDate: string;

    @IsString()
    @IsNotEmpty({ message: 'A congregação é obrigatória.' })
    congregacao: string;

    @IsString()
    @IsNotEmpty({ message: 'A função na igreja é obrigatória.' })
    funcaoIgreja: string;

    @IsString()
    @IsNotEmpty({ message: 'A profissão é obrigatória.' })
    profession: string;

    @IsString()
    @IsNotEmpty({ message: 'O nome do pastor é obrigatório.' })
    namePastor: string;

    // Campos de timestamp não precisam de validação
    createdAt: Timestamp;
    updatedAt: Timestamp;
}