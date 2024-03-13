/// <reference types="multer" />
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
export declare class PersonController {
    private readonly personService;
    constructor(personService: PersonService);
    getQuery(name: string, age: number): string;
    getParams(id: string): string;
    getUrlEncode(createPersonDot: CreatePersonDto): string;
    getformData(createPersonDot: CreatePersonDto, files: Array<Express.Multer.File>): string;
    getJson(createPersonDot: CreatePersonDto): string;
}
