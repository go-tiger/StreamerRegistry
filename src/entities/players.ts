import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('players', { schema: 'public' })
export class Player {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column({ type: 'varchar', name: 'minecraft_id', length: 50, nullable: true })
  minecraftId: string;

  @Column({ type: 'text', unique: true, nullable: false })
  uuid: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  nickname: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: false })
  createdAt: Date;
}
