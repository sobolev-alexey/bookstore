import { PartialType } from '@nestjs/mapped-types';
import { CreateBookMiniDto } from './create-book-mini.dto';

export class UpdateBookMiniDto extends PartialType(CreateBookMiniDto) {}
