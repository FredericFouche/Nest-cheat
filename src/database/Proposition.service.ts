import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proposition } from './Proposition.entities';

@Injectable()
export class PropositionService {
  constructor(
    @InjectRepository(Proposition)
    private readonly propositionRepository: Repository<Proposition>,
  ) {}

  // CRUD -> en réalité, on ne fait que le Read car on ne peut pas modifier les quiz pour l'instant

  async findByQuestionId(questionId: number): Promise<Proposition[]> {
    return this.propositionRepository.find({
      where: { question: { id: Number(questionId) } },
    });
  }
}
