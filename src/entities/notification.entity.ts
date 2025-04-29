import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm'
import { Users } from './user.entity'

enum NotificationType {
  ORDER = 'order',
  PRODUCT = 'product',
  SYSTEM = 'system',
}

@Entity('notifications')
export class Notification {
  @PrimaryColumn({ length: 50 })
  id: string

  @Column({ name: 'user_id' })
  userId: string

  @ManyToOne(() => Users, user => user.notifications, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: Users

  @Column()
  title: string

  @Column({ type: 'text' })
  message: string

  @Column({
    type: 'enum',
    enum: NotificationType,
    nullable: true,
  })
  type: NotificationType

  @Column({ name: 'reference_id', nullable: true })
  referenceId: string

  @Column({ name: 'is_read', default: false })
  isRead: boolean

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date
}
