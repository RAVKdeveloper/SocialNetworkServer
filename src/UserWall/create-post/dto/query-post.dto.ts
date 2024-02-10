import { IsNotEmpty } from "class-validator"

export class QueryPostDto {

    @IsNotEmpty()
    readonly limit: string

    @IsNotEmpty()
    readonly page: string

    @IsNotEmpty()
    readonly action: string

    readonly searchText: string
}