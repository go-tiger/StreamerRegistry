import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Streamer } from './streamers';

@Entity('players', { schema: 'public' })
export class Player {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column({ type: 'varchar', name: 'minecraft_id', length: 50, nullable: true })
  minecraftId: string;

  @Column({ type: 'uuid', unique: true, nullable: false })
  uuid: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  nickname: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: false })
  createdAt: Date;

  @OneToMany(() => Streamer, (streamer) => streamer.player)
  streamers: Streamer[];
}
