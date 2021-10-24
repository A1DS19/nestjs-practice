import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/entity/user.entity';
import { ApproveReportDto } from '../dto/approve-report.dto';
import { CreateReportDto } from '../dto/create-report.dto';
import { GetEstimateDto } from '../dto/get-estimate.dto';
import { ReportDto } from '../dto/report.dto';
import { Report } from '../entity/report.entity';
import { ReportsService } from '../service/reports.service';
import { GetEstimateValue } from '../types/return-type-estimate-value';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post('/')
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  async createReport(
    @Body() body: CreateReportDto,
    @CurrentUser() currentUser: User,
  ): Promise<Report> {
    return await this.reportsService.create(body, currentUser);
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  async upproveReport(
    @Param('id') id: string,
    @Body() body: ApproveReportDto,
  ): Promise<Report> {
    return await this.reportsService.changeApproveStatus(id, body);
  }

  @Get('/')
  async estimateValue(
    @Query() query: GetEstimateDto,
  ): Promise<GetEstimateValue> {
    return await this.reportsService.estimateValue(query);
  }
}
