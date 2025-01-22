import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Player } from './players';

export enum Platform {
  SOOP = 'SOOP',
  CHZZK = 'CHZZK',
}

@Entity('streamers', { schema: 'public' })
export class Streamer {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column({ type: 'enum', enum: Platform, nullable: false })
  platform: Platform;

  @Column({ type: 'varchar', length: 50, nullable: true })
  nickname: string;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  channel: string;

  @ManyToOne(() => Player, (player) => player.id, { nullable: false })
  @JoinColumn([{ name: 'player_id', referencedColumnName: 'id' }])
  player: Player;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: false })
  createdAt: Date;
}
