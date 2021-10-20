import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
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
