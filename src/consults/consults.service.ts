import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Entity, Repository } from 'typeorm';
import { RequestConsultInput } from './dto/request-consult.dto';
import { Consult } from './entities/consult.entity';

@Injectable()
export class ConsultService {
  constructor(
    @InjectRepository(Consult) private readonly consults: Repository<Consult>,
  ) {}

  async requestConsult(requestConsultInput: RequestConsultInput): Promise<{ ok: boolean; error?: string }> {
    try {
        const newConsult = this.consults.create(requestConsultInput);
        await this.consults.save(newConsult);
        return {
            ok:true
        }
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}
