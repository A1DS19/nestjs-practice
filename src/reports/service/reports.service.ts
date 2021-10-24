import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entity/user.entity';
import { Repository } from 'typeorm';
import { ApproveReportDto } from '../dto/approve-report.dto';
import { CreateReportDto } from '../dto/create-report.dto';
import { GetEstimateDto } from '../dto/get-estimate.dto';
import { Report } from '../entity/report.entity';
import { GetEstimateValue } from '../types/return-type-estimate-value';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private readonly repo: Repository<Report>,
  ) {}

  async create(reportDto: CreateReportDto, currentUser: User): Promise<Report> {
    const report = this.repo.create(reportDto);
    report.user = currentUser;

    return await this.repo.save(report);
  }

  async changeApproveStatus(
    id: string,
    body: ApproveReportDto,
  ): Promise<Report> {
    const report = await this.repo.findOne(id);

    if (!report) {
      throw new NotFoundException('Reporte no existe');
    }

    report.approved = body.approved;
    return await this.repo.save(report);
  }

  async estimateValue(query: GetEstimateDto): Promise<GetEstimateValue> {
    return await this.repo
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where(`make = :make`, { make: query.make })
      .andWhere(`model = :model`, { model: query.model })
      .andWhere(`lng - :lng BETWEEN -5 AND 5`, { lng: query.lng })
      .andWhere(`lat - :lat BETWEEN -5 AND 5`, { lat: query.lat })
      .andWhere(`year - :year BETWEEN -3 AND 3`, { year: query.year })
      .andWhere(`approved = :approved`, { approved: true })
      .orderBy(`ABS(mileage - :mileage)`, 'DESC')
      .setParameters({ mileage: query.mileage })
      .limit(3)
      .getRawOne();
  }
}
