import { Report } from 'src/reports/entity/report.entity';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  admin: boolean;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  @AfterInsert()
  logInsert() {
    console.log(`New usuario ${this.email}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Update usuario ${this.email}`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`Delete usuario ${this.email}`);
  }
}
